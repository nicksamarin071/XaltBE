import { uploadFileToS3 } from "./s3.js";
import { AWS_S3_FOLDER } from "../utils/constants.js";
export const uploadImagesToS3 = async (req) => {
    // Handle single + multiple files
    const files = req.files
        ? req.files
        : req.file
            ? [req.file]
            : [];
    if (files.length === 0) {
        return [];
    }
    // Upload images
    const uploadedImages = [];
    for (const file of files) {
        const imageUrl = await uploadFileToS3(AWS_S3_FOLDER, `${Date.now()}-${file.originalname}`, file.buffer, file.mimetype);
        uploadedImages.push(imageUrl);
    }
    return uploadedImages;
};
//# sourceMappingURL=uploadimages.s3.js.map