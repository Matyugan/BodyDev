const { ErrorHandler } = require("../../../helpers/CommonError");
const User = require("../../users/models");
const Verification = require("../../verification/model");
const nodemailer = require("../../../config/NodemailerConfiguration");
const argon2 = require("argon2");

exports.createUser = async function (request, response, next) {
  const {
    firstName,
    lastName,
    age,
    email,
    password,
    confirmPassword,
  } = request.body;

  try {
    if (firstName && lastName && age && email && password && confirmPassword) {
      const isUser = await User.findOne({ where: { email } });

      if (isUser) {
        throw new ErrorHandler(403, "Пользователь уже существует!");
      }

      if (password !== confirmPassword)
        throw new ErrorHandler(403, "Пароли не совпадают!");

      // Later change on jwt token
      const secretKey = process.env.SECRET_KEY;
      let verificationToken = "";

      for (let i = 0; i < 10; i++) {
        verificationToken +=
          secretKey[Math.floor(Math.random() * verificationToken.length)];
      }

      const user = await User.create({
        firstName,
        lastName,
        age,
        email,
        password: await argon2.hash(password),
      });

      await Verification.create({
        verificationToken,
        userId: user.id,
      });

      nodemailer.sendMail(
        {
          from: process.env.NODEMAILER_FROM,
          to: email,
          subject: "Регистрация нового пользователя",
          text: "Поздравляем, Вы успешно зарегистрировались",
          html: `
            <h1>Пожалуйста, подтвердите свой email</h1>
            <h2>Доброго времени суток, ${firstName} ${lastName} </h2>
            <p>Спасибо за регистрацию в нашем сервисе BodyDev. Пожалуйста, подвердите свой email по ссылке ниже</p>
            <a href=http://localhost:3000/verification/${verificationToken}>Подтвердить email</a>
            </div>
          `,
        },
        (err) => {
          console.log(err);
        }
      );

      response.status(200).json({ message: "Пользователь создан!", user });
    }
  } catch (error) {
    next(error);
  }
};
