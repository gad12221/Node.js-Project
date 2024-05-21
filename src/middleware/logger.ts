import { RequestHandler } from "express";

const logger: RequestHandler = (req, res, next) => {
  console.log(req.method, req.url);

  next();
};

export { logger };
export default logger;

//(req, res, next) => json parse the body as json next()
//(req, res, next) => logger (clg) next()
//(req, res, next) => users router next()
//(req, res, next) => cards router next()
//(req, res, next) => notFound router response
