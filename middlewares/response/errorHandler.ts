import type { NextFunction, Request, Response } from "express";
import { resSend } from "./resSend.js";

const errorHandler = (error: any, req: Request, res: Response, next: NextFunction): void => {
  if (!error) {
    return next();
  }
  resSend(res, 400, error.message, null);
};

export default errorHandler;
