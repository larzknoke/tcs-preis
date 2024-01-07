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
      let receiver = [];
      receiver.push(botschafter.email);
      botschafter.botcontacts.map((contact) => receiver.push(contact.email));

      // ANREDEN
      let anreden = [];
      let botAnrede =
        botschafter.anrede == "Frau"
          ? `Sehr geehrte Frau ${botschafter.vorname} ${botschafter.name}, `
          : `Sehr geehrter Herr ${botschafter.vorname} ${botschafter.name}, `;
      anreden.push(botAnrede);

      botschafter.botcontacts.map((contact) => {
        let botContactAnrede =
          contact.anrede == "Frau"
            ? `Sehr geehrte Frau ${contact.name}, `
            : `Sehr geehrter Herr ${contact.name}, `;
        anreden.push(botContactAnrede);
      });

      console.log("anreden", anreden);
      console.log("receiver", receiver);

      await sendEmail({
        to:
          process.env.NODE_ENV === "development"
            ? "info@larsknoke.com"
            : receiver,
        bcc: "stiftungspreis@tc-stiftung.de",
        subject:
          "11. Town & Country Stiftungspreis, Übersicht geförderte Projekte zur Prüfung",
        html: render(
          <BotschafterEmail botschafter={botschafter} anreden={anreden} />
        ),
        attachments: [
          {
            filename: `Botschafter_${botschafter.vorname}_${botschafter.name}_${botschafter.id}.pdf`,
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

      const updateBot = await prisma.botschafter.update({
        where: {
          id: botschafter.id,
        },
        data: {
          botmail1: new Date(),
        },
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
