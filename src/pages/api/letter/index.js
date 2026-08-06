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
          aktiv: true,
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
          subject: result.sonderpreis
            ? "Town & Country Stiftungs-Sonderpreis: Bitte bestätigt Eure Bewerbung"
            : "12. Town & Country Stiftungspreis: Bitte bestätigt Eure Bewerbung",
          html: render(<VerifyEmail letter={result} />),
        });
      } else {
        await sendEmail({
          to: ["info@larsknoke.com"],
          subject: "TC-Stiftung - Stiftungspreis 2025 - Fehler",
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
      const body = req.body || {};
      const id = parseInt(body.id, 10);
      const expectedUpdatedAt = body.expectedUpdatedAt;

      if (!id) {
        return res.status(400).json({ message: "invalid id" });
      }

      const data = { ...body };
      [
        "id",
        "expectedUpdatedAt",
        "notes",
        "files",
        "botschafterId",
        "kampagneId",
        "botschafter",
        "kampagne",
        "lettercontacts",
        "createdAt",
        "updatedAt",
      ].forEach((k) => delete data[k]);

      Object.keys(data).forEach((key) => {
        if (typeof data[key] === "undefined") {
          delete data[key];
        }
      });

      if (Object.keys(data).length === 0) {
        return res.status(400).json({ message: "no updatable fields" });
      }

      const where = expectedUpdatedAt
        ? { id, updatedAt: new Date(expectedUpdatedAt) }
        : { id };

      const updated = await prisma.letter.updateMany({
        where,
        data: { ...data, updatedAt: new Date() },
      });

      if (updated.count === 0) {
        return res.status(409).json({
          message:
            "Konflikt: Datensatz wurde zwischenzeitlich geaendert. Bitte neu laden.",
        });
      }

      const result = await prisma.letter.findUnique({ where: { id } });
      return res.status(200).json(result);
    } catch (error) {
      console.log("api error: ", error);
      return res.status(500).json(error);
    }
  }
}
