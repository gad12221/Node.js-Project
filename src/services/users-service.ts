import { IUser } from "../@types/@types";
import User from "../db/models/user-model";
import bcrypt from "bcrypt";

const createUser = async (data: IUser) => {
  const user = new User(data);
  //replace the password with it's hash
  const hash = await bcrypt.hash(user.password, 12);
  user.password = hash;
  return user.save();
};

export { createUser };
