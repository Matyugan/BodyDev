const { verification } = require("../services");

exports.verification = async function (request, response, next) {
  try {
    await verification(request, response, next);
  } catch (error) {
    next(error);
  }
};
