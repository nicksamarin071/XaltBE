import type { NextFunction, Request, Response } from "express";
import multer from "multer";
import { resSend } from "../response/resSend.js";

// Define allowed file types as a constant
const allowedFileTypes = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "application/pdf",
  "application/vnd.ms-excel", // for older Excel formats
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // for newer Excel formats (xlsx)
];


// Create a Multer instance with memory storage and file size limit

const uploadSingleDocumentConfig = multer({
  storage: multer.memoryStorage() // 1MB size limit
}).single("image"); // Use the 'single' method for a single file upload

// Middleware function for file uploads

export const uploadSingleDocument = (req: Request, res: Response, next: NextFunction) => {
  uploadSingleDocumentConfig(req, res, (err: any) => {
    if (err) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return resSend(res, 400, "File size exceeds 1MB.", null);
      }
      return resSend(res, 400, "File upload failed.", err.message);
    }
    if (!req.file) {
      return resSend(res, 400, "No file uploaded.", null);
    }

    if (!allowedFileTypes.includes(req.file.mimetype)) {
      return resSend(res, 400, "Invalid file type. Allowed types: JPEG, PNG, PDF.", null);
    }
    next();
  });
};



export const uploadMultipleDocuments = (req: Request, res: Response, next: NextFunction) => {
    try {
      const baseUrl = req.baseUrl;
  
      const uploadDynamicFieldsConfig = multer({
        storage: multer.memoryStorage(),
      }).any(); // Accept any fields dynamically
  
      uploadDynamicFieldsConfig(req, res, (err: any) => {
        if (err) {
          return next(new Error("File upload failed: " + err.message));
        }
  
        if (req.files) {
          const invalidFileTypes = Object.values(req.files)
            .flat() // Flatten the array of files
            .filter(file => !allowedFileTypes.includes(file.mimetype));
  
          if (invalidFileTypes.length > 0) {
            return resSend(res, 400, "Invalid file type. Allowed types: JPEG, PNG, PDF.", null);
          }
        }
        next();
      });
    } catch (error) {
      next(error);
    }
  };











  // Save only for images locally save uploads folder because now I have AWS key

// const storage = multer.diskStorage({ destination: (req, file, cb ) => {
//     cb(null, "uploads/");
//   },filename: (req, file, cb) => {

//    const uniqueName =
//       Date.now() +
//       "-" +
//       file.originalname;

//     cb(null, uniqueName);
//   },
// });

// const uploadSingleDocumentConfig = multer({
//  storage, limits: {
//     fileSize: 1024 * 1024 * 5,
//   },
// }).single("image");