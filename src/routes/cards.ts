import { Router } from "express";
import { validateToken } from "../middleware/validate-token";
import { validateCard } from "../middleware/joi";
import { cardService } from "../services/card-service";
import { isBusiness } from "../middleware/is-business";
import { Logger } from "../logs/logger";
import BizCardsError from "../errors/BizCardsError";
import { isAdminOrSelf } from "../middleware/is-admin-or-self";

const router = Router();

router.post("/", ...isBusiness, validateCard, async (req, res, next) => {
  try {
    const userId = req.payload._id;
    if (req.payload.isBusiness) {
      const result = await cardService.createCard(req.body, userId);
      res.status(201).json(result);

    } else {
      res.status(400).json({ message: "Only business users may create cards" });
    }

  } catch (e) {
    next(e)
  }

});



router.get("/", async (req, res, next) => {
  try {
    const cards = await cardService.getAllCards();
    res.json(cards);
  } catch (e) {
    next(e);
  }
});

router.get("/my-cards", validateToken, async (req, res, next) => {
  try {
    const cards = await cardService.getUserCards(req.payload._id);
    if (!cards) {
      Logger.error("No ID provided");
      throw new BizCardsError(400, "No ID provided");
    }
    res.json(cards);
  } catch (e) {
    next(e);
  }
});


router.get("/:id", async (req, res, next) => {
  try {
    const card = await cardService.getCardById(req.params.id);
    if (!card) {
      Logger.error("No ID provided");
      throw new BizCardsError(400, "No ID provided");
    }
    res.json(card);
  } catch (e) {
    next(e);
  }
});

router.put("/:id", validateToken, validateCard, async (req, res, next) => {
  try {
    const result = await cardService.updateCard(req.params.id, req.body);
    if (!result) {
      Logger.error("No ID provided");
      throw new BizCardsError(400, "No ID provided");
    }
    res.json(result);
  } catch (e) {
    next(e);
  }
});



router.patch("/:id", validateToken, async (req, res, next) => {
  try {
    if (req.body.bizNumber !== undefined) {
      const { bizNumber } = req.body;
      if (bizNumber < 1_000_000 || bizNumber > 9_999_999) {
        Logger.error("BizNumber must be between 1,000,000 and 9,999,999");
        throw new BizCardsError(400, "BizNumber must be between 1,000,000 and 9,999,999");
      }
      const result = await cardService.updateBizNumber(req.params.id, bizNumber);
      res.json(result);
    } else if (req.body.likes !== undefined) {
      const { likes } = req.body;
      const like = !!likes;
      const result = await cardService.likeCard(req.params.id, req.payload._id, like);
      res.json(result);
      Logger.log(like ? 'Like successfully completed' : 'Unlike successfully completed');
    } else {
      res.status(400).json({ message: "Invalid request. Specify 'bizNumber' or 'likes' field." });
    }
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", ...isAdminOrSelf, validateToken, async (req, res, next) => {

  try {
    await cardService.deleteCard(req.params.id);

    res.json("Card are Deleted");

  } catch (e) {
    next(e);
  }
});


export { router as cardRouter }