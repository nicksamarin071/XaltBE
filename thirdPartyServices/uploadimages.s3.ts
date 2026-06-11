import type { Request } from "express";
import { uploadFileToS3 } from "./s3.js";
import { AWS_S3_FOLDER } from "../utils/constants.js";


export const uploadImagesToS3 = async (req: Request): Promise<string[]> => {

  // Handle single + multiple files
  const files = req.files
    ? (req.files as Express.Multer.File[])
    : req.file
    ? [req.file]
    : [];

   if (files.length === 0) {
      return [];
    }

  // Upload images
  const uploadedImages: string[] = [];

  for (const file of files) {

    const imageUrl = await uploadFileToS3(
      AWS_S3_FOLDER as string,
      `${Date.now()}-${file.originalname}`,
      file.buffer,
      file.mimetype
    );

    uploadedImages.push(imageUrl);
  }

  return uploadedImages;
};