import { IUser } from "../@types/@types";
import User from "../db/models/user-model";

const createUser = (data: IUser) => {
  const user = new User(data);
  return user.save();
};


export {createUser}