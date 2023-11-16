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

      const getBots = async () => {
        const bots = csv.map(async (bot) => {
          const botData = await prisma.botschafter.findFirst({
            where: {
              vorname: bot.vorname,
              name: bot.name,
            },
          });
          return botData;
        });
        return Promise.all(bots);
      };
      const bots = await getBots();

      console.log("bots:", bots);
      console.log("bots length:", bots.length);
      // return res.status(200).json({ success: true, botschafter: botschafter });
      return res.status(200).json({ success: true });
    } catch (error) {
      console.log("api error: ", error);
      return res.status(500).json(error);
    }
  }
}