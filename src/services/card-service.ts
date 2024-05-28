import _ from "underscore";
import { ICard, ICardInput } from "../@types/@types";
import Card from "../db/models/card-model";

const generateBizNumber = async (card: ICard) => {
  //generate random bizNumber:
  while (true) {
    const r = _.random(1_000_000, 9_999_999);
    const dbRes = await Card.findOne({ bizNumber: r });
    if (!dbRes) {
      card.bizNumber = r;
      break;
    }
  }
};

export const cardService = {
  createCard: async (data: ICardInput, userId: string) => {
    //userId is extracted from the JWT
    const card = new Card(data);
    //assign user id to the card:
    card.userId = userId;
    //generate biz number to the card:
    generateBizNumber(card);

    return card.save();
  },
};