// Router from express
import { Router } from "express";
import { createUser } from "../services/users-service";
import userSchema from "../validations/user-schema";

const router = Router();

router.post("/", async (req, res, next) => {
  try {
    const user = await userSchema.validateAsync(req.body);

    const saved = await createUser(user);
    res.status(201).json(saved);
  } catch (e) {
    next(e);
  }
});

export default router;
