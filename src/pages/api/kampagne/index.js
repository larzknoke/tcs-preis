import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handle(req, res) {
  console.log("api call");
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: "not authorzied" });
  }

  if (req.method == "POST") {
    try {
      const data = req.body;
      console.log("data: ", data);
      const result = await prisma.kampagne.create({ data: data });
      console.log("result: ", result);
      return res.status(200).json({ success: true, result });
    } catch (error) {
      console.log("api error: ", error);
      return res.status(500).json(error);
    }
  }

  if (req.method == "GET") {
    try {
      const result = await prisma.kampagne.findMany();
      console.log("result: ", result);
      return res.status(200).json(result);
    } catch (error) {
      console.log("api error: ", error);
      return res.status(500).json(error);
    }
  }
}
