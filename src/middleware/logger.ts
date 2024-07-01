import chalk from 'chalk';
import fs from 'node:fs';
import { RequestHandler } from "express";


const logger: RequestHandler = (req, res, next) => {

    const timestamp = new Date().toISOString();
    const logMessage = `${req.method} ${req.url}`;
    const queryParams = JSON.stringify(req.query);


    console.log(
        chalk.bgYellow.bold(req.url),
        chalk.bgGreen.bold('Timestamp:'),
        chalk.green(timestamp),
        chalk.bgCyan.bold('Query Params:'),
        chalk.cyan(queryParams)
    );

    fs.appendFile('logs.txt', `${timestamp} ${logMessage} Query Params: ${queryParams}\n`, (err) => {
        if (err) {
            console.error(chalk.bgRed.bold('Error writing to log file'), err);
        }
    });

    next();
};


export default logger;