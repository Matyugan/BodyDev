exports.errorHandler = function (error, request, response) {
  response.status(error.statusCode || 500).json({ message: error.message });
};
