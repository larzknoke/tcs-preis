import { S3Client } from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { v4 as uuidv4 } from "uuid";

const contentTypes = {
  jpeg: "image/jpeg",
  jpg: "image/jpeg",
  png: "image/x-png",
  zip: "application/zip",
  pdf: "application/pdf",
};

function getContentType(filename) {
  filename = filename.toLowerCase();
  const nameParts = filename.split(".");
  const ext = nameParts[nameParts.length - 1];
  if (contentTypes[ext]) {
    return contentTypes[ext];
  }
  return "text/plain";
}

export default async function handler(req, res) {
  const s3Client = new S3Client({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  });

  const fileFolder = uuidv4();

  const post = await createPresignedPost(s3Client, {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: fileFolder + "/" + req.query.file,
    Fields: {
      // acl: "public-read",
      acl: "private",
      "Content-Type": getContentType(req.query.file),
    },
    Expires: 600, // seconds
  });
  console.log("createPresignedPost: ", post);
  res.status(200).json(post);
}
