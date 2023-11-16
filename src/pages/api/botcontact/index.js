import prisma from "@/lib/prisma";

export default async function handle(req, res) {
  console.log("api call");
  if (req.method == "POST") {
    try {
      const data = req.body;
      console.log("botcontact data: ", data);
      const result = await prisma.botcontact.create({ data: data });
      console.log("botcontact result: ", result);
      return res.status(200).json({ success: true, result });
    } catch (error) {
      console.log("botcontact api error: ", error);
      return res.status(500).json(error);
    }
  }

  // if (req.method == "GET") {
  //   try {
  //     const result = await prisma.botcontact.findMany();
  //     console.log("result: ", result);
  //     return res.status(200).json(result);
  //   } catch (error) {
  //     console.log("api error: ", error);
  //     return res.status(500).json(error);
  //   }
  // }

  if (req.method == "DELETE") {
    try {
      const { id } = req.query;
      console.log(id);
      const result = await prisma.botcontact.delete({
        where: { id: parseInt(id) },
      });
      console.log("botcontact result: ", result);
      return res.status(200).json(result);
    } catch (error) {
      console.log("botcontact api error: ", error);
      return res.status(500).json(error);
    }
  }

  if (req.method == "PUT") {
    try {
      const id = req.body.id;
      const result = await prisma.botcontact.update({
        where: { id: parseInt(id) },
        data: {
          anrede: req.body.anrede,
          name: req.body.name,
          funktion: req.body.funktion,
          email: req.body.email,
          telefon: req.body.telefon,
          notiz: req.body.notiz,
        },
      });
      return res.status(200).json(result);
    } catch (error) {
      console.log("botcontact api error: ", error);
      return res.status(500).json(error);
    }
  }
}
