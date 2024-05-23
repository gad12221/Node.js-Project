import { Router } from "express";
import { createUser } from "../services/users-service";
import {validateUser } from "../middleware/joi/validate-schema";
const router = Router();

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
