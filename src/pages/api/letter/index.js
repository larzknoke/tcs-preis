import prisma from "@/lib/prisma";
import { sendEmail } from "@/lib/email";
import VerifyEmail from "@/email/VerifyEmail";
import { render } from "@react-email/render";

export default async function handle(req, res) {
  console.log("api call");
  if (req.method == "POST") {
    try {
      const data = req.body;
      console.log("data: ", data);
      const kampagne = await prisma.kampagne.findFirst({
        where: {
          abgeschlossen: false,
        },
      });
      data.kampagneId = kampagne ? kampagne.id : null;
      const result = await prisma.letter.create({ data: data });

      await sendEmail({
        to: ["stiftungspreis@tc-stiftung.de", "info@larsknoke.com"],
        subject: "TC-Stiftung - Stiftungspreis 2023 - Bestätigung",
        html: render(<VerifyEmail letter={result} />),
      });

      return res.status(200).json({ success: true, result });
    } catch (error) {
      console.log("api error: ", error);
      return res.status(500).json(error);
    }
  }
}
