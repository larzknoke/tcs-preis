import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3 } from "../../../lib/s3";

export default async function handle(req, res) {
  const session = await getServerSession(req, res, authOptions);
  console.log("session", session);

  if (req.method == "GET") {
    const { key } = req.query;
    try {
      const command = new GetObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: key,
      });
      const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
      return res.status(200).json(url);
    } catch (error) {
      return res.status(500).json({ error: error.message, code: error.code });
    }
  }

  if (req.method == "DELETE") {
    const { id } = req.query;
    try {
      const result = await prisma.file.delete({
        where: { id: parseInt(id) },
      });
      const delCommand = new DeleteObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: result.file,
      });
      await s3.send(delCommand);
      return res.status(200).json({ success: true, result });
    } catch (error) {
      console.log("file delete error: ", error);
      return res.status(500).json({ error: error.message, code: error.code });
    }
  }

  if (req.method == "POST") {
    try {
      const data = req.body;
      const result = await prisma.file.create({
        data: data,
      });
      return res.status(200).json(result);
    } catch (error) {
      console.log("file post error: ", error);
      return res.status(500).json({ error: error.message, code: error.code });
    }
  }
}
