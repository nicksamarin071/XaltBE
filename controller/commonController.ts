import type { NextFunction, Request, Response } from "express";
import { resSend } from "../middlewares/response/resSend.js";

export const healthCheckC = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    resSend(res, 200, "Ok.", {});
  } catch (error) {
    next(error);
  }
};
