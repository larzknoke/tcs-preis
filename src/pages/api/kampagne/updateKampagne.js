import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handle(req, res) {
  console.log("api call");

  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: "not authorzied" });
  }

  const data = req.body;
  try {
    console.log("data: ", data);
    const result = await prisma.kampagne.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
        abgeschlossen: data.abgeschlossen,
        aktiv: data.aktiv,
      },
    });
    console.log("result: ", result);
    return res.status(200).json({ success: true, result });
  } catch (error) {
    console.log("api error: ", error);
    return res.status(500).json(error);
  }
}
