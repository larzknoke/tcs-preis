import prisma from "@/lib/prisma";

export default async function handle(req, res) {
  console.log("api call");
  const data = req.body;
  try {
    console.log("data: ", data);
    const result = await prisma.letter.update({
      where: {
        id: data.id,
      },
      data: {
        status: data.status,
      },
    });
    console.log("result: ", result);
    return res.status(200).json({ success: true, result });
  } catch (error) {
    console.log("api error: ", error);
    return res.status(500).json(error);
  }
}
