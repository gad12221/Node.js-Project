
import express, { json } from "express";
import usersRouter from "./routes/users";
import notFound from "./middleware/not-found";
import connect from "./db/connection";
import configDevEnv from "../config";
import errorHandler from "./middleware/error-handler";
import morgan from "morgan";
import { cardRouter } from "./routes/cards";
import { Logger } from "./logs/logger";
configDevEnv();
connect();
import cors from 'cors';
import chalk from "chalk";
Logger.log(`Express.js server that connects to a database, includes logging, handles errors, and has routes for managing users and cards
  
  
`);

const app = express();


app.use(json());
app.use(morgan("dev"));
app.use(cors({ origin: "*" }));
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/cards", cardRouter);
app.use(express.static("public"));
app.use(errorHandler);
app.use(notFound);

//start the server:
const port = 8080
app.listen(port, () => {

  console.log(`Server is running on PORT ${chalk.red(port)}`);
  console.log(`App is running in ${process.env.NODE_ENV} mode`);
});
