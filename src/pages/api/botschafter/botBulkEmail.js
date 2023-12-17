import prisma from "@/lib/prisma";
import { sendEmail } from "@/lib/email";
import { render } from "@react-email/render";
import { renderToBuffer } from "@react-pdf/renderer";
import { BotschafterPDF } from "@/pdf/botschafterPDF";
import BotschafterEmail from "@/email/BotschafterEmail";

export default async function handle(req, res) {
  console.log("api call");

  try {
    const id = req.body;
    const kampagnenBots = await prisma.botschafter.findMany({
      where: {
        letters: {
          some: { kampagneId: parseInt(id), verified: true },
        },
      },
      include: {
        letters: {
          select: {
            id: true,
            nameTraeger: true,
            vorstandTraeger: true,
            strasseTraeger: true,
            plzTraeger: true,
            ortTraeger: true,
            bundeslandTraeger: true,
            vereinTraeger: true,
            organisationProjekt: true,
            ansprechpartnerProjekt: true,
            telefonnummerProjekt: true,
            mobilProjekt: true,
            emailProjekt: true,
            wwwProjekt: true,
            ibanProjekt: true,
            kontoNameProjekt: true,
            botschafterId: true,
            kampagneId: true,
            andereLizenzpartner: true,
            zuwendungAndere: true,
            status: true,
            verified: true,
            verifyId: true,
            bankNameProjekt: true,
            bundeslandProjekt: true,
            ehrenamtlichAnzahl: true,
            ehrenamtlichStunden: true,
            hauptamtlichAnzahl: true,
            hauptamtlichStunden: true,
            mitarbeiterProjekt: true,
            nameProjekt: true,
            strasseProjekt: true,
            wannProjekt: true,
            checkFreistellung: true,
            terminGeld: true,
            terminUebergabe: true,
            bildmaterial: true,
            socialFremd: true,
            socialNotiz: true,
            socialTCS: true,
            presseEinladung: true,
            presseErlaubt: true,
            presseErledigt: true,
            presseFreigabe: true,
            presseMitteilung: true,
            presseVersendet: true,
            zwb1000: true,
            zwb5000: true,
            ortProjekt: true,
            plzProjekt: true,
            jury: true,
            botschafterConfirm: true,
            lettercontacts: {
              select: {
                name: true,
                anrede: true,
                telefon: true,
                funktion: true,
                email: true,
              },
            },
          },
        },
        botcontacts: true,
      },
    });
    let mailsPromise = kampagnenBots.map(async (bot) => {
      // RECEIVER
      let receiver = [];
      receiver.push(bot.email);
      bot.botcontacts.map((contact) => receiver.push(contact.email));

      // ANREDEN
      let anreden = [];
      let botAnrede =
        bot.anrede == "Frau"
          ? `Sehr geehrte Frau ${bot.vorname} ${bot.name}, `
          : `Sehr geehrter Herr ${bot.vorname} ${bot.name}, `;
      anreden.push(botAnrede);

      bot.botcontacts.map((contact) => {
        let botContactAnrede =
          contact.anrede == "Frau"
            ? `Sehr geehrte Frau ${contact.name}, `
            : `Sehr geehrter Herr ${contact.name}, `;
        anreden.push(botContactAnrede);
      });

      console.log("anreden", anreden);
      console.log("receiver", receiver);
      if (receiver.length > 0) {
        const resEmail = await sendEmail(
          {
            to:
              process.env.NODE_ENV === "development"
                ? "tcs-preis@larsknoke.com"
                : "tcs-preis@larsknoke.com",
            subject:
              "11. Town & Country Stiftungspreis, Übersicht geförderte Projekte zur Prüfung",
            html: render(
              <BotschafterEmail botschafter={bot} anreden={anreden} />
            ),
            attachments: [
              {
                filename: `Botschafter_${bot.vorname}_${bot.name}_${bot.id}.pdf`,
                content: await renderToBuffer(
                  <BotschafterPDF
                    zusatzAngaben={false}
                    bot={bot}
                    allLetter={false}
                  />
                ),
              },
            ],
          },
          true // POOL PARAMETER
        );
        return resEmail;
      } else {
        console.error("No Botschafter");
      }
    });
    // console.log("mails", mails);
    const mails = await Promise.all(mailsPromise);
    console.log("mails", mails);
    return res.status(200).json({ success: true, kampagnenBots, mails });
  } catch (error) {
    console.log("api error: ", error);
    return res.status(500).json(error);
  }
}
