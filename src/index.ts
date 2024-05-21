import express, {json} from "express";
import usersRouter from "./routes/users";
import logger from "./middleware/logger";
import notFound from "./middleware/not-found";
import kittenRouter from "./routes/kittens";
import connect from "./db/connection";
import configDevEnv from "../config";
configDevEnv();
connect();
const app = express();

//middleware chain:
app.use(json());
app.use(logger);

//http://localhost:8080/api/v1/users
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/kittens", kittenRouter);
app.use(notFound);

//start the server:
app.listen(8080, () => {
  console.log("Server is running on http://localhost:8080");
  console.log(`App is running in ${process.env.NODE_ENV} mode`);
});