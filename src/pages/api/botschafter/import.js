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
      const createManyBotschafters = csv.map(async (botschafter) => {
        await prisma.botschafter.create({
          data: botschafter,
        });
      });
      Promise.all(createManyBotschafters);

      return res.status(200).json({ success: true });
    } catch (error) {
      console.log("api error: ", error);
      return res.status(500).json(error);
    }
  }
}
