import prisma from "@/lib/prisma";
import VerifyInvite from "@/email/VerifyInvite";
import ErrorEmail from "@/email/ErrorEmail";
import { sendEmail } from "@/lib/email";
import { render } from "@react-email/render";
import CancelInviteEmail from "@/email/CancelInviteEmail";

export default async function handle(req, res) {
  console.log("api call");

  if (req.method == "POST") {
    try {
      const data = req.body;
      console.log("data: ", data);

      const kampagne = await prisma.kampagne.findFirst();
      data.kampagneId = kampagne ? kampagne.id : null;

      const result = await prisma.invite.create({ data: data });

      if (result.email) {
        // *** ZUSAGE ***
        if (result.teilnahme) {
          await sendEmail({
            to:
              process.env.NODE_ENV === "development"
                ? ["info@larsknoke.com"]
                : result.email,
            subject:
              "11. Town & Country Stiftungsgala – bitte bestätigen Sie Ihre Anmeldung",
            html: render(<VerifyInvite invite={result} />),
          });
        }
        // *** ABSAGE ***
        if (!result.teilnahme) {
          await sendEmail({
            to:
              process.env.NODE_ENV === "development"
                ? ["info@larsknoke.com"]
                : result.email,
            bcc:
              process.env.NODE_ENV === "development"
                ? ""
                : "stiftungspreis@tc-stiftung.de",
            subject: "11. Town & Country Stiftungsgala – Absage",
            html: render(<CancelInviteEmail invite={result} />),
          });
        }
      } else {
        await sendEmail({
          to: ["info@larsknoke.com"],
          subject: "TC-Stiftung - Stiftungspreis 2023 - Fehler",
          html: render(<ErrorEmail invite={result} />),
        });
      }

      return res.status(200).json({ success: true, result });
    } catch (error) {
      console.log("api error: ", error);
      return res.status(500).json(error);
    }
  }

  //   if (req.method == "GET") {
  //     try {
  //       const result = await prisma.invite.findMany();
  //       console.log("result: ", result);
  //       return res.status(200).json(result);
  //     } catch (error) {
  //       console.log("api error: ", error);
  //       return res.status(500).json(error);
  //     }
  //   }
}
