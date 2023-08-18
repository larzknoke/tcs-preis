import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "@/lib/prisma";

export default async function handle(req, res) {
  console.log("api call");
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: "not authorzied" });
  }

  if (req.method == "POST") {
    try {
      const csv = req.body;
      console.log("csv: ", csv);
      const botschafter = await prisma.botschafter.createMany({ data: csv });
      console.log("botschafter", botschafter);
      return res.status(200).json({ success: true, botschafter: botschafter });
    } catch (error) {
      console.log("api error: ", error);
      return res.status(500).json(error);
    }
  }
}
