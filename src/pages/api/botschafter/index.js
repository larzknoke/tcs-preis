import prisma from "@/lib/prisma";

export default async function handle(req, res) {
  console.log("api call");
  if (req.method == "POST") {
    try {
      const data = req.body;
      console.log("data: ", data);
      const result = await prisma.botschafter.create({ data: data });
      console.log("result: ", result);
      return res.status(200).json({ success: true, result });
    } catch (error) {
      console.log("api error: ", error);
      return res.status(500).json(error);
    }
  }

  if (req.method == "GET") {
    try {
      const result = await prisma.botschafter.findMany();
      console.log("result: ", result);
      return res.status(200).json(result);
    } catch (error) {
      console.log("api error: ", error);
      return res.status(500).json(error);
    }
  }

  if (req.method == "DELETE") {
    try {
      const { botschafterId } = req.body;
      const result = await prisma.botschafter.delete({
        where: { id: parseInt(botschafterId) },
      });
      console.log("result: ", result);
      return res.status(200).json(result);
    } catch (error) {
      console.log("api error: ", error);
      return res.status(500).json(error);
    }
  }
}
