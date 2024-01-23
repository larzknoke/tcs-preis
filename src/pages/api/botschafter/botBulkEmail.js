import prisma from "@/lib/prisma";
import nodemailer from "nodemailer";
import { render } from "@react-email/render";
import { renderToBuffer, pdf, renderToFile } from "@react-pdf/renderer";
import { BotschafterPDF } from "@/pdf/botschafterPDF";
import BotschafterEmail from "@/email/BotschafterEmail";
import BotschafterEmail2 from "@/email/BotschafterEmail2";
import JSZip from "jszip";
import { LetterBotPDF } from "@/pdf/letterBotPDF";

export default async function handle(req, res) {
  console.log("api call");

  try {
    // INIT NODEMAILER
    const smtpOptions = {
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    };
    const transporter = nodemailer.createTransport({
      ...smtpOptions,
      pool: true,
    });

    const { kampagneId, testMode, freitext, emailVersion } = req.body;
    const kampagnenBots = await prisma.botschafter.findMany({
      where: {
        letters: {
          some: {
            kampagneId: parseInt(kampagneId),
            verified: true,
            status: { in: ["1111", "5000", "ausland1111", "ausland5000"] },
            botschafterConfirm: true,
          },
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
            beschreibungProjekt: true,
            zielsetzungProjekt: true,
            benachteiligungProjekt: true,
            umsetzungProjekt: true,
            bisherigeErgebnisse: true,
            eigenmittel: true,
            oeffentlicheZuwendungen: true,
            privateSpenden: true,
            bisherigeFoerderung: true,
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
    let mailsPromise = kampagnenBots
      .filter((bot, index) => (testMode ? index === 0 : true))
      .map(async (bot) => {
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

        // BEWERBUNGEN
        let letters = bot.letters.filter(
          (letter) =>
            ["1111", "5000", "ausland1111", "ausland5000"].includes(
              letter.status
            ) && letter.botschafterConfirm
        );

        let letterAttachments = [];
        if (letters.length > 0) {
          letters.map(async (letter) => {
            letterAttachments.push({
              filename: `Bewerbung_${letter.id}.pdf`,
              content: await renderToBuffer(<LetterBotPDF letter={letter} />),
            });
          });
        }

        // const zip = new JSZip();

        // if (letters.length > 0) {
        //   letters.map((letter) => {
        //     zip.file(
        //       `Bewerbung_${letter.id}.pdf`,
        //       pdf(
        //         <LetterBotPDF letter={letter} />
        //       ).toBlob()
        //     );
        //   });
        // }
        // const blob = await zip.generateAsync({ type: "blob" })
        // console.log('blob: ', blob);

        console.log("anreden", anreden);
        console.log("receiver", receiver);
        if (receiver.length > 0) {
          const resEmail = await transporter.sendMail({
            from: `Town & Country Stiftung <${process.env.SMTP_FROM_EMAIL}>`,
            to: testMode ? "info@larsknoke.com" : receiver,
            // bcc: "stiftungspreis@tc-stiftung.de",
            subject:
              (emailVersion == "1" &&
                "11. Town & Country Stiftungspreis - Übersicht geförderte Projekte zur Prüfung") ||
              (emailVersion == "2" &&
                "11. Town & Country Stiftungspreis – überbringen Sie die gute Nachricht zuerst?") ||
              (emailVersion == "3" &&
                "11. Town & Country Stiftungspreis - ???? "),
            html:
              (emailVersion == "1" &&
                render(
                  <BotschafterEmail botschafter={bot} anreden={anreden} />
                )) ||
              (emailVersion == "2" &&
                render(
                  <BotschafterEmail2 botschafter={bot} anreden={anreden} />
                )) ||
              (emailVersion == "3" &&
                render(
                  <BotschafterEmail botschafter={bot} anreden={anreden} />
                )),
            attachments: [
              {
                filename: `Übersicht_${bot.vorname}_${bot.name}_${bot.id}.pdf`,
                content: await renderToBuffer(
                  <BotschafterPDF
                    zusatzAngaben={false}
                    bot={bot}
                    allLetter={false}
                    freitext={freitext}
                  />
                ),
              },
              {
                path:
                  process.cwd() +
                  "/public/Hinweise_und_Checkliste_fuer_Uebergabe.pdf",
              },
            ].concat(letterAttachments),
          });
          return resEmail;
        } else {
          console.error("No Botschafter");
        }
      });
    const mails = await Promise.all(mailsPromise);

    // ZEITSTEMPEL FÜR EMAIL AUSGANG
    const ids = kampagnenBots.map((bot) => bot.id);
    if (!testMode) {
      if (emailVersion == "1") {
        const updatedBots = await prisma.botschafter.updateMany({
          where: {
            id: { in: ids },
          },
          data: {
            botmail1: new Date(),
          },
        });
      }
      if (emailVersion == "2") {
        const updatedBots = await prisma.botschafter.updateMany({
          where: {
            id: { in: ids },
          },
          data: {
            botmail2: new Date(),
          },
        });
      }
    }

    console.log("mails", mails);
    return res.status(200).json({ success: true, kampagnenBots, mails });
  } catch (error) {
    console.log("api error: ", error);
    return res.status(500).json(error);
  }
}
