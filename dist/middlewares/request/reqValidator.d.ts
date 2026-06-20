import type { Request, Response, NextFunction } from "express";
import type { ObjectSchema } from "joi";
declare const reqValidator: (validator: ObjectSchema) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
export default reqValidator;
//# sourceMappingURL=reqValidator.d.ts.map