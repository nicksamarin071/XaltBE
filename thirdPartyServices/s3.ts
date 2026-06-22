import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

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
    const bucket = process.env.S3_BUCKET_NAME;
    const region = process.env.AWS_REGION;

   if (!bucket) throw new Error("S3_BUCKET_NAME is missing");
   if (!region) throw new Error("AWS_REGION is missing");
    // Prepare the S3 object key (path + filename)
    // const objectKey = path + "/" + filename;
    const objectKey = `${path}/${filename}`;
    
    const uploadResponse = await s3Client.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: objectKey,
        Body: bufferFile,
        ContentType: contentType,
      })
    );
    if (uploadResponse.$metadata.httpStatusCode === 200) {
      const s3ObjectUrl = `https://${bucket}.s3.${region}.amazonaws.com/${objectKey}`;
      
      return s3ObjectUrl;
    } else {
      throw new Error("Failed to upload file to S3");
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};



