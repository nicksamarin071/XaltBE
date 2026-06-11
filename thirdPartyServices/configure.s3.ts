import  { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { AWS_ACCESS_KEY_ID, AWS_REGION, AWS_SECRET_ACCESS_KEY } from "../utils/constants.js";
import { S3_BUCKET_NAME } from "../utils/constants.js";
const s3 = new S3Client({
  region: AWS_REGION as string,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID as string,
    secretAccessKey: AWS_SECRET_ACCESS_KEY as string,
  },
});





export const deleteimageFromS3 = async (
  image: string | string[]
): Promise<void> => {
  try {
    // Convert single image into array
    const imageArray = Array.isArray(image)
      ? image
      : [image];

    for (const imageUrl of imageArray) {
      if (!imageUrl) continue;

      // Extract complete key after amazonaws.com/
      const key = decodeURIComponent(
        imageUrl.split(".amazonaws.com/")[1] as string
      );

      if (!key) {
        console.warn("Invalid S3 image URL:", imageUrl);
        continue;
      }

      await s3.send(
        new DeleteObjectCommand({
          Bucket: S3_BUCKET_NAME,
          Key: key,
        })
      );

      console.log(`Image deleted from S3: ${key}`);
    }
  } catch (error) {
    console.log("S3 delete error:", error);
  }
};