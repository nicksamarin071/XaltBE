import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { AWS_ACCESS_KEY_ID, AWS_REGION, AWS_SECRET_ACCESS_KEY } from "../utils/constants.js";
import { S3_BUCKET_NAME } from "../utils/constants.js";
const s3 = new S3Client({
    region: AWS_REGION,
    credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
    },
});
export const deleteimageFromS3 = async (image) => {
    try {
        // Convert single image into array
        const imageArray = Array.isArray(image)
            ? image
            : [image];
        for (const imageUrl of imageArray) {
            if (!imageUrl)
                continue;
            // Extract complete key after amazonaws.com/
            const key = decodeURIComponent(imageUrl.split(".amazonaws.com/")[1]);
            if (!key) {
                console.warn("Invalid S3 image URL:", imageUrl);
                continue;
            }
            await s3.send(new DeleteObjectCommand({
                Bucket: S3_BUCKET_NAME,
                Key: key,
            }));
            console.log(`Image deleted from S3: ${key}`);
        }
    }
    catch (error) {
        console.log("S3 delete error:", error);
    }
};
//# sourceMappingURL=configure.s3.js.map