const User = require("../../users/models");
const Verification = require("../model");

const { ErrorHandler } = require("../../../helpers/CommonError");

exports.verification = async function (request, response, next) {
  const { verificationToken } = request.params;
  try {
    const userData = await Verification.findOne({
      where: { verificationToken },
      include: {
        model: User,
      },
    });

    if (!userData)
      throw new ErrorHandler(
        500,
        "Пользователя, с таким верификационным ключом не существует"
      );

    const { verified } = userData.User;

    // TODO if the user has been verified, a redirect to the personal account
    if (verified)
      response.status(200).json({ message: "Пользователь уже верифицирован" });

    await userData.User.update(
      { verified: true },
      { where: { id: userData.User.id } }
    );
    response.status(200).json(userData);
  } catch (error) {
    next(error);
  }
};
