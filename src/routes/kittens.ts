import { Router } from "express";
import { createKitten, findCatByName, getAllKittens } from "../services/kittens-service";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const result = await createKitten(req.body);
    res.status(201).json(result);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.get("/", async (req, res) => {
  try {
    const results = await getAllKittens();
    res.json(results);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.get("/search", async (req, res)=>{
  try {
    //http://localhost:8080/api/v1/kittens/search?name=Fluffy
    const { name } = req.query;
    const results = await findCatByName(name as string);
    res.json(results);
  } catch (e) {
    res.status(500).json(e);
  }
});

export default router;
