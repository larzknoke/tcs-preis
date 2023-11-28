import { sendEmail } from "@/lib/email";
import { render } from "@react-email/render";
import { renderToBuffer } from "@react-pdf/renderer";
import { BotschafterPDF } from "@/pdf/botschafterPDF";
import BotschafterEmail from "@/email/BotschafterEmail";

export default async function handle(req, res) {
  console.log("api call");

  try {
    const { botschafter, zusatzAngaben, allLetter } = req.body;
    if (botschafter && botschafter.email) {
      await sendEmail({
        to:
          process.env.NODE_ENV === "development"
            ? "info@larsknoke.com"
            : "stiftungspreis@tc-stiftung.de",
        subject: "Botschafter Übersicht - 11. Town & Country Stiftungspreis",
        html: render(<BotschafterEmail botschafter={botschafter} />),
        attachments: [
          {
            filename: `Botschafter_${botschafter.id}.pdf`,
            content: await renderToBuffer(
              <BotschafterPDF
                zusatzAngaben={zusatzAngaben}
                bot={botschafter}
                allLetter={allLetter}
              />
            ),
          },
        ],
      });
    } else {
      throw new Error("No Botschafter");
    }

    return res.status(200).json({ success: true, botschafter });
  } catch (error) {
    console.log("api error: ", error);
    return res.status(500).json(error);
  }
}
