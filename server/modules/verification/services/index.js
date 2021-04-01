const User = require("../../users/models");
const { ErrorHandler } = require("../../../helpers/CommonError");

exports.verification = async function (request, response, next) {
  const { verificationToken } = request.params;
  try {
    if (!verificationToken) {
      throw new ErrorHandler(403, "Упс, токена не существует");
    }

    const user = await User.findOne({ where: { verificationToken } });

    if (!user) {
      throw new ErrorHandler(403, "Пользователь не найден");
    }

    await user.update({
      verifyed: true,
      verificationToken: null,
    });

    response.status(200).json({ message: "Email подтвержден " });
  } catch (error) {
    next(error);
  }
};
