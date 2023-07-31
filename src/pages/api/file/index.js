import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import formidable from "formidable";
import {
  GetObjectCommand,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuidv4 } from "uuid";
import * as fs from "fs";
import { s3 } from "../../../lib/s3";

export const config = {
  api: { bodyParser: false },
};

export default async function handle(req, res) {
  const session = await getServerSession(req, res, authOptions);
  console.log("session", session);
  if (!session) {
    return res.status(401).json({ error: "401 not authenticated" });
  }

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
      console.log("error: ", error);
      return res.status(500).json({ error: error.message, code: error.code });
    }
  }

  if (req.method == "POST") {
    const form = formidable({
      uploadDir: "./.tmp",
      keepExtensions: true,
      multiples: false,
      maxFileSize: 500 * 1024 * 1024,
    });
    form.on("error", (err) => {
      console.log(err);
      return res
        .status(500)
        .json({ success: false, message: "Datei ist ungültig." });
    });

    form.parse(req, async (err, fields, files) => {
      try {
        const fileFolder = uuidv4();

        const file = files.file[0];
        console.log("file: ", file);

        const key = fileFolder + "/" + file.originalFilename;

        const fileParams = {
          Bucket: process.env.S3_BUCKET_NAME,
          Key: key,
          Body: fs.readFileSync(file.filepath),
          ContentType: file.mimetype,
          ACL: "public-read",
        };

        console.log("fileParams: ", fileParams);

        await s3.send(new PutObjectCommand(fileParams));

        console.log(fields);

        const result = await prisma.file.create({
          data: {
            title: fields["title"][0],
            note: fields["note"][0],
            file: key,
            letterId: parseInt(fields["letterId"][0]),
          },
        });
        return res.status(200).json(result);
      } catch (error) {
        console.log("error: ", error);
        return res.status(500).json({ error: error.message, code: error.code });
      }
    });
  }
}
