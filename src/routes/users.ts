// Router from express
import { Router } from "express";
import { createUser } from "../services/users-service";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const saved = await createUser(req.body);
    res.status(201).json(saved);
  } catch (e) {
    console.log(e);

    //if MongoServerError => 400
    //else if JSON error => 400 bad request
    //SyntaxError: Bad control character in string
    res.status(500).json(e);
  }
});

export default router;
