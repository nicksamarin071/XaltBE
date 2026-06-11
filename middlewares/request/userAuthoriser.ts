import type { Request, Response, NextFunction } from "express";
import { resSend } from "../response/resSend.js";
import { verifyToken } from "../../utils/jwt.js";

declare module "express-serve-static-core" {
  interface Request {
    validatedQuery?: any;
    session?: {
      _id: string;
      email: string;
      role: string;
    }
  }
}

export const userAuthenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Skip if module is common
    const urlParts = req.url.split("/");
    const moduleNameFromUrl = urlParts[1]; // Assuming the first part of the URL is the module name

    if (moduleNameFromUrl === "common") return next();

    // Extract token and validate.
    const { headers } = req;
    const authorizationHeader = headers["authorization"];

    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
      throw new Error("Bearer token missing or invalid");
    }

    const token = authorizationHeader.split(" ")[1];

    if (!token) {
      throw new Error("Token missing");
    }

    const decodedToken: any = await verifyToken(token);
    req.session = decodedToken;
    next();
  } catch (error: any) {
    resSend(res, 401, error.message, null);
  }
};

