import prisma from "@/lib/prisma";

export default async function handle(req, res) {
  console.log("api call");
  if (req.method == "GET") {
    try {
      console.log("req.query", req.query);
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
