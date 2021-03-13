const registrationService = require("../services/");

exports.createUser = async (request, response, next) => {
  try {
    await registrationService.createUser(request, response, next);
  } catch (error) {
    next(error);
  }
};
