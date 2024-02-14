import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handle(req, res) {
  console.log("api call");
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: "not authorzied" });
  }

  try {
    const { id, typ } = req.body;

    const result = await prisma.letter.update({
      where: {
        id: id,
      },
      data: {
        [typ]: null,
        updatedAt: new Date(),
      },
    });
    console.log("result: ", result);
    return res.status(200).json({ success: true, result });
  } catch (error) {
    console.log("api error: ", error);
    return res.status(500).json(error);
  }
}
