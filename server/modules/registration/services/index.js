const User = require("../../users/models");

exports.createUser = async function (request, response, next) {
  try {
    const {
      firstName,
      lastName,
      age,
      email,
      password,
      confirmPassword,
    } = request.body;

    if (firstName && lastName && age && email && password && confirmPassword) {
      const isUser = await User.findOne({ where: { email } });

      if (isUser) {
        throw new Error({
          statusCode: 403,
          message: "Forbidden",
        });
      }

      if (password !== confirmPassword) throw new Error("Пароли не совпадают");

      const user = await User.create({
        firstName,
        lastName,
        age,
        email,
        password,
      });

      response.status(200).json({ message: "Пользователь создан", user });
    }
  } catch (error) {
    next(error);
  }
};
