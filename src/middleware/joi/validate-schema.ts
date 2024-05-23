import { RequestHandler } from "express";
import userSchema from "../../validations/user-schema";
import { ObjectSchema } from "joi";

const validateUser: RequestHandler = async (req, res, next) => {
  try {
    await userSchema.validateAsync(req.body);
    next();
  } catch (e) {
    next(e);
  }
};

type ValidateSchema = (schema: ObjectSchema) => RequestHandler;

export const validateSchema:ValidateSchema = (schema: ObjectSchema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (e) {
    next(e);
  }
};
 

export { validateUser };