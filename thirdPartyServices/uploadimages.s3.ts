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


  const imageFiles = files.filter(
    file => file.fieldname === "image"
  );

   if (imageFiles.length === 0) {
      return [];
    }

  // Upload images
  const uploadedImages: string[] = [];

  for (const file of imageFiles) {

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


export const uploadFeatureImageToS3 = async (
  req: Request
): Promise<string> => {

  const files = req.files as Express.Multer.File[];

  const featureFile = files.find(
    file => file.fieldname === "feature_image"
  );

  if (!featureFile) {
    return "";
  }

  return await uploadFileToS3(
    AWS_S3_FOLDER as string,
    `${Date.now()}-${featureFile.originalname}`,
    featureFile.buffer,
    featureFile.mimetype
  );
};