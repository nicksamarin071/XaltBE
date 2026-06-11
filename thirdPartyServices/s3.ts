import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { AWS_REGION, S3_BUCKET_NAME } from "../utils/constants.js";

// Create an S3 client
const s3Client = new S3Client({ region: "ap-south-1" });

export const uploadFileToS3 = async (
  path: string,
  filename: string,
  bufferFile: Buffer,
  contentType?: string
  // hasPublicAccess: boolean
): Promise<string> => {
  try {
    // Prepare the S3 object key (path + filename)
    // const objectKey = path + "/" + filename;
    const objectKey = `${path}/${filename}`;

    // Set ACL (Access Control List) based on hasPublicAccess
    // const acl = hasPublicAccess ? "public-read" : "private";

    // Upload the file to S3
    const uploadResponse = await s3Client.send(
      new PutObjectCommand({
        Bucket: S3_BUCKET_NAME,
        Key: objectKey,
        Body: bufferFile,
        ContentType: contentType,
        // ACL: acl,
      })
    );

    // If the upload was successful, return the S3 object URL
    if (uploadResponse.$metadata.httpStatusCode === 200) {
      const s3ObjectUrl = `https://${S3_BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/${objectKey}`;
      return s3ObjectUrl;
    } else {
      throw new Error("Failed to upload file to S3");
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};



