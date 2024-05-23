import { RequestHandler } from "express";
import userSchema from "../../validations/user-schema";
import { ObjectSchema } from "joi";
import loginSchema from "../../validations/login-schema";

type ValidateSchema = (schema: ObjectSchema) => RequestHandler;

export const validateSchema: ValidateSchema =
  (schema: ObjectSchema) => async (req, res, next) => {
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (e) {
      next(e);
    }
  };

const validateUser = validateSchema(userSchema);
const validateLogin = validateSchema(loginSchema);

export { validateUser, validateLogin };
