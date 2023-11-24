import prisma from "@/lib/prisma";

export default async function handle(req, res) {
  if (req.method == "GET") {
    try {
      const result = await prisma.kampagne.findMany({
        where: {
          abgeschlossen: false,
        },
      });
      return res.status(200).json(result);
    } catch (error) {
      console.log("api error: ", error);
      return res.status(500).json(error);
    }
  }
}
