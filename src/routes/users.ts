import { Router } from "express";
import { createUser } from "../services/users-service";
import { validateLogin, validateUser } from "../middleware/joi/validate-schema";
import User from "../db/models/user-model";
import bcrypt from "bcrypt";
const router = Router();

router.post("/login", validateLogin, async (req, res, next) => {
  //given email and password
  try {
    //const result = await login(req.body);
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(401).json({ message: "invalid email or password" });
    }

    const isValid = await bcrypt.compare(req.body.password, user.password);

    if (isValid) return res.json({ message: "logged in" });

    res.status(401).json({ message: "invalid email or password" });
  } catch (e) {
    next(e);
  }
});

router.post("/", validateUser, async (req, res, next) => {
  try {
    const result = await createUser(req.body);

    const { password, ...saved } = result.toJSON();
    //return all data but saved!
    res.status(201).json(saved);
  } catch (e) {
    next(e);
  }
});

export default router;
