import type { NextFunction, Request, Response } from "express";
export declare const uploadSingleDocumentConfig: import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
export declare const uploadSingleDocument: (req: Request, res: Response, next: NextFunction) => void;
export declare const uploadMultipleDocuments: (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=uploadFiles.d.ts.map