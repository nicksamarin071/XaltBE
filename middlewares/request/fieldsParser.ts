import type{ Request, Response, NextFunction } from "express";
import { resSend } from "../response/resSend.js";


export const parseFilters = (req: Request, res: Response, next: NextFunction) => {
  try {
    let filters = req.body.filters;

    // if not sent → always make empty object
    if (!filters) {
      req.body.filters = {};
      return next();
    }

    // if string → parse -> Converts string to JS Object
    if (typeof filters === "string") {
      req.body.filters = JSON.parse(filters);
      return next();
    }

    // if already object → keep it
    if (typeof filters === "object") {
      return next();
    }

    // fallback safety
    req.body.filters = {};
    return next();

  } catch (error) {
    return resSend(res, 400, "Invalid filters JSON format", null);
  }
};