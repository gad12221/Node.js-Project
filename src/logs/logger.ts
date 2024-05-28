import chalk from "chalk";
import fs from 'fs';
class Logger {
  private static isProd = () => process.env.NODE_ENV === "dev";

  static error(message: string) {
    if (this.isProd()) {
        fs.appendFile("logs.txt", message + "\n", ()=>{})
        return
    };
    console.error(chalk.red(message));
  }

  static log(message: string) {
    if (this.isProd()) {
      fs.appendFile("logs.txt", message + "\n", () => {});
      return;
    }
    console.log(chalk.green(message));
  }
}

export { Logger };
