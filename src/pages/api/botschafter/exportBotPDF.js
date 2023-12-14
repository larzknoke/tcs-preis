import prisma from "@/lib/prisma";

export default async function handle(req, res) {
  console.log("api call");

  if (req.method == "POST") {
    try {
      const result = await prisma.botschafter.findMany({
        where: {
          letters: {
            some: { kampagneId: req.body.kampagneId, verified: true },
          },
        },
        include: {
          letters: true,
          botcontacts: true,
        },
      });

      console.log("result: ", result);
      return res.status(200).json(result);
    } catch (error) {
      console.log("api error: ", error);
      return res.status(500).json(error);
    }
  }
}
