import { Logger } from "../logs/logger";
import { users } from "./initial-data";
import User from "./models/user-model";

const initDB = async () => {
  try {
    const usersCount = await User.countDocuments();

    if (usersCount != 0) return;

    for (let u of users) {
      const user = new User(u);
      const saved = await user.save();
      Logger.verbose(saved);
    }
  } catch (e) {
    Logger.log(e);
  }
};

export default initDB;
