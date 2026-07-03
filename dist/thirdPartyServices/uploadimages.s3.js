import { uploadFileToS3 } from "./s3.js";
import { AWS_S3_FOLDER } from "../utils/constants.js";
export const uploadImagesToS3 = async (req) => {
    // Handle single + multiple files
    const files = req.files
        ? req.files
        : req.file
            ? [req.file]
            : [];
    const imageFiles = files.filter(file => file.fieldname === "image");
    if (imageFiles.length === 0) {
        return [];
    }
    // Upload images
    const uploadedImages = [];
    for (const file of imageFiles) {
        const imageUrl = await uploadFileToS3(AWS_S3_FOLDER, `${Date.now()}-${file.originalname}`, file.buffer, file.mimetype);
        uploadedImages.push(imageUrl);
    }
    return uploadedImages;
};
export const uploadFeatureImageToS3 = async (req) => {
    const files = req.files;
    const featureFile = files.find(file => file.fieldname === "feature_image");
    if (!featureFile) {
        return "";
    }
    return await uploadFileToS3(AWS_S3_FOLDER, `${Date.now()}-${featureFile.originalname}`, featureFile.buffer, featureFile.mimetype);
};
//# sourceMappingURL=uploadimages.s3.js.map