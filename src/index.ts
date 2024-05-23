import express, { json } from "express";
import usersRouter from "./routes/users";
import logger from "./middleware/logger";
import notFound from "./middleware/not-found";
import connect from "./db/connection";
import configDevEnv from "../config";
import errorHandler from "./middleware/error-handler";
configDevEnv();
connect();
const app = express();

//middleware chain:
app.use(json());
app.use(logger);

//http://localhost:8080/api/v1/users
app.use("/api/v1/users", usersRouter);
app.use(errorHandler);
app.use(notFound);

//start the server:
app.listen(8080, () => {
  console.log("Server is running on http://localhost:8080");
  console.log(`App is running in ${process.env.NODE_ENV} mode`);
});
