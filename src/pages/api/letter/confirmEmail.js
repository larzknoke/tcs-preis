import { sendEmail } from "@/lib/email";
import { render } from "@react-email/render";
import ConfirmEmail from "@/email/ConfirmEmail";
import ConfirmStiftungEmail from "@/email/ConfirmStiftungEmail";
import { LetterPDF } from "@/email/pdf";
import { renderToBuffer } from "@react-pdf/renderer";

export default async function handle(req, res) {
  console.log("api call");

  try {
    // console.log("req.body", req.body);
    const { letter } = req.body;
    if (letter && letter.verified) {
      await sendEmail({
        to:
          process.env.NODE_ENV === "development"
            ? "info@larsknoke.com"
            : letter.emailProjekt,
        subject:
          "11. Town & Country Stiftungspreis: Vielen Dank für Ihre Bewerbung",
        html: render(<ConfirmEmail letter={letter} />),
        attachments: [
          {
            filename: "Bewerbung.pdf",
            content: await renderToBuffer(<LetterPDF letter={letter} />),
          },
        ],
      });
      await sendEmail({
        to:
          process.env.NODE_ENV === "development"
            ? "info@larsknoke.com"
            : ["stiftungspreis@tc-stiftung.de", "info@larsknoke.com"],
        subject: `11. Stiftungspreis - Neue Bewerbung | ${letter.id} | ${letter.nameTraeger}`,
        html: render(<ConfirmStiftungEmail letter={letter} />),
        attachments: [
          {
            filename: "Bewerbung.pdf",
            content: await renderToBuffer(<LetterPDF letter={letter} />),
          },
        ],
      });
    } else {
      throw new Error("No Letter");
    }

    return res.status(200).json({ success: true, letter });
  } catch (error) {
    console.log("api error: ", error);
    return res.status(500).json(error);
  }
}
