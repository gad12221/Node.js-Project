// Router from express
import { Router } from "express";
import { createUser } from "../services/users-service";

const router = Router();

router.post("/", async (req, res, next) => {
  //validate
  try {
    const saved = await createUser(req.body); 
    res.status(201).json(saved);
  } catch (e) {
    next(e);
  }
});

export default router;
