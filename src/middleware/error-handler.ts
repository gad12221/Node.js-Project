import { ValidationError } from "joi";
import { ErrorRequestHandler } from "express";

import { MongoServerError } from "mongodb";
import BizCardsError from "../errors/BizCardsError";
import { Logger } from "../logs/logger";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {

  if (err instanceof BizCardsError) {
    return res.status(err.status).json(err);
  }

  if (err && err.name && err.name == "CastError" && err.path && err.value) {
    return res
      .status(400)
      .json({ message: "Invalid object id", path: err.path, value: err.value });
  }

  if (err instanceof SyntaxError) {
    return res.status(400).json({ message: "Invalid JSON" });
  }

  if (err instanceof MongoServerError && err.code === 11000) {
    Logger.error("Duplicate key - Must be unique");
    return res.status(400).json({
      message: "Duplicate key - Must be unique",
      value: err.keyValue,
    });
  }

  if (err instanceof ValidationError) {
    return res.status(400).json({ message: err.message });
  }

  console.error(err);

  return res.status(500).json(err);
};

export default errorHandler;
