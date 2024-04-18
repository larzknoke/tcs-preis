import prisma from "@/lib/prisma";
import VerifyInvite from "@/email/VerifyInvite";
import ErrorEmail from "@/email/ErrorEmail";
import { sendEmail } from "@/lib/email";
import { render } from "@react-email/render";

export default async function handle(req, res) {
  console.log("api call");

  if (req.method == "POST") {
    try {
      const data = req.body;
      console.log("data: ", data);
      const result = await prisma.invite.create({ data: data });
      console.log("result: ", result);

      if (result.email) {
        await sendEmail({
          to:
            process.env.NODE_ENV === "development"
              ? ["info@larsknoke.com"]
              : result.email,
          subject:
            "11. Town & Country Stiftungsgala – bitte Anmeldung bestätigen",
          html: render(<VerifyInvite invite={result} />),
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
