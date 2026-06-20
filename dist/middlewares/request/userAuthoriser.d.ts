import type { Request, Response, NextFunction } from "express";
declare module "express-serve-static-core" {
    interface Request {
        validatedQuery?: any;
        session?: {
            _id: string;
            email: string;
            role: string;
        };
    }
}
export declare const userAuthenticate: (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=userAuthoriser.d.ts.map