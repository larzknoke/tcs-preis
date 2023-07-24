import prisma from "@/lib/prisma";

export default async function handle(req, res) {
  console.log("api call");
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
      },
    });
    console.log("result: ", result);
    return res.status(200).json({ success: true, result });
  } catch (error) {
    console.log("api error: ", error);
    return res.status(500).json(error);
  }
}
