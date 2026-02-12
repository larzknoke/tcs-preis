import prisma from "@/lib/prisma";

export default async function handle(req, res) {
  console.log("api call");

  if (req.method == "POST") {
    try {
      const kampagneId = req.body.kampagneId
        ? parseInt(req.body.kampagneId, 10)
        : null;
      const lettersWhere = {
        verified: true,
        ...(kampagneId ? { kampagneId: kampagneId } : {}),
      };

      const result = await prisma.botschafter.findMany({
        where: kampagneId
          ? {
              letters: {
                some: lettersWhere,
              },
            }
          : undefined,
        include: {
          letters: {
            where: lettersWhere,
            include: {
              kampagne: true,
              lettercontacts: true,
            },
          },
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
