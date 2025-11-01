import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handle(req, res) {
  console.log("api call");
  if (req.method == "GET") {
    try {
      console.log("req.query", req.query);

      // Check for a session
      const session = await getServerSession(req, res, authOptions);

      // Check for an active and incomplete kampagne
      const kampagne = await prisma.kampagne.findFirst({
        where: {
          abgeschlossen: false,
          aktiv: true,
        },
      });

      // If no session and no kampagne, return an error
      if (!session && !kampagne) {
        return res
          .status(500)
          .json({ msg: "Die Bewerbungsphase ist beendet." });
      }

      const { verifyId } = req.query;
      const result = await prisma.letter.update({
        where: {
          verifyId: verifyId,
        },
        data: {
          verified: true,
          verifyId: null,
        },
      });
      return res.status(200).json(result);
    } catch (error) {
      console.log("api error: ", error);
      return res.status(404).json(error);
    }
  }
}
