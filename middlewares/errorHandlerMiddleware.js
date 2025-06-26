function errorHandlerMiddleware(err, req, res, next) {
  console.error("Aqui hay un error:");

  if (err.name === "SequelizeValidationError") {
    return res.status(400).json({
      error: "Validation error",
      details: err.errors.map((e) => e.message),
    });
  }

  if (err.name === "SequelizeForeignKeyConstraintError") {
    return res.status(400).json({
      error: "Invalid foreign key",
      details: err.message,
    });
  }

  res.status(err.status || 500).json({
    error: err.message || "Internal server error",
  });
}

module.exports = errorHandlerMiddleware;
