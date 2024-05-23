import { ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {

  if (err && err.code && err.code == 11000) {
    return res.status(400).json({
      message: "duplicate key - must be unique",
      value: err.keyValue,
    });
  }

  if (err && err.type && err.type == "entity.parse.failed") {
    return res.status(400).json({ message: "Invalid JSON" });
  }

  if (err && err.name && err.name == "ValidationError") {
    return res.status(400).json({ message: err.message });
  }

  //internal server error
  return res.status(500).json(err);
};

export default errorHandler;
