exports.errorHandler = function (error, request, response, next) {
  if (error instanceof Error) {
    const { statusCode, message } = error;
    response.status(statusCode ?? 500).json({
      errorMessage: message,
      statusCode,
    });
  }
};
