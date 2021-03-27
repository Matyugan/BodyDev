const { ErrorHandler } = require("../../../helpers/CommonError");
const User = require("../../users/models");
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

      const user = await User.create({
        firstName,
        lastName,
        age,
        email,
        password: await argon2.hash(password),
      });

      nodemailer.sendMail(
        {
          from: process.env.NODEMAILER_FROM,
          to: email,
          subject: "Регистрация нового пользователя",
          text: "Поздравляем, Вы успешно зарегистрировались",
          message: "<h3>Пройдите верификацию по ссылке ниже.</h3>",
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
