import { Router } from "express";
import { validateCard } from "../middleware/joi";
import { cardService } from "../services/card-service";
import { isBusiness } from "../middleware/is-business";

const router = Router();

router.post("/", ...isBusiness, validateCard, async (req, res, next) => {
  try {
    const result = await cardService.createCard(req.body, req.payload._id);
    res.status(201).json(result);
  } catch (e) {
    next(e);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const cards = await cardService.getCards();
    res.json(cards);
  } catch (e) {
    next(e);
  }
});

export { router as cardRouter };
