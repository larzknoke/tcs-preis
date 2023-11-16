import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { sendEmail } from "@/lib/email";
import VerifyEmail from "@/email/VerifyEmail";
import { render } from "@react-email/render";
import ErrorEmail from "@/email/ErrorEmail";

export default async function handle(req, res) {
  console.log("api call");
  const session = await getServerSession(req, res, authOptions);

  if (req.method == "POST") {
    try {
      const data = req.body;
      const dataCopy = JSON.parse(JSON.stringify(data));
      const kampagne = await prisma.kampagne.findFirst({
        where: {
          abgeschlossen: false,
        },
      });
      if (!session && !kampagne) {
        return res
          .status(500)
          .json({ msg: "Die Bewerbungsphase ist beendet." });
      }
      data.kampagneId = kampagne ? kampagne.id : null;
      data.originalLetter = dataCopy;
      const result = await prisma.letter.create({ data: data });

      if (result.emailProjekt) {
        await sendEmail({
          to:
            process.env.NODE_ENV === "development"
              ? ["info@larsknoke.com"]
              : result.emailProjekt,
          subject:
            "11. Town & Country Stiftungspreis: Bitte bestätigen Sie Ihre Bewerbung",
          html: render(<VerifyEmail letter={result} />),
        });
      } else {
        await sendEmail({
          to: ["info@larsknoke.com"],
          subject: "TC-Stiftung - Stiftungspreis 2023 - Fehler",
          html: render(<ErrorEmail letter={result} />),
        });
      }

      return res.status(200).json({ success: true, result });
    } catch (error) {
      console.log("api error: ", error);
      return res.status(500).json(error);
    }
  }
  if (req.method == "PUT") {
    try {
      const data = req.body;
      [
        "notes",
        "files",
        "botschafterId",
        "kampagneId",
        "botschafter",
        "kampagne",
      ].forEach((k) => delete data[k]);

      const result = await prisma.letter.update({
        where: { id: parseInt(data.id) },
        data: { ...data, updatedAt: new Date() },
      });
      return res.status(200).json(result);
    } catch (error) {
      console.log("api error: ", error);
      return res.status(500).json(error);
    }
  }
}
