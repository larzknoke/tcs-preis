import prisma from "@/lib/prisma";
import nodemailer from "nodemailer";
import { render } from "@react-email/render";
import LetterEmail1 from "@/email/LetterEmail1";

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

    const { kampagneId, testMode, emailVersion } = req.body;
    const letters = await prisma.letter.findMany({
      where: {
        kampagneId: parseInt(kampagneId),
        verified: true,
        status: { in: ["1111", "5000", "ausland1111", "ausland5000"] },
      },
      select: {
        id: true,
        nameProjekt: true,
        emailProjekt: true,
        ansprechpartnerProjekt: true,
        botschafterConfirm: true,
        botschafter: {
          include: {
            botcontacts: true,
          },
        },
      },
    });
    let mailsPromise = letters
      .filter((letter, index) =>
        testMode ? [0, 1, 2, 3].includes(index) : true
      )
      .map(async (letter) => {
        let attachments = [];
        if (letter.botschafterConfirm) {
          // ANHÄNGE
          attachments = [
            {
              path:
                process.cwd() +
                "/public/Datenschutzhinweis_Uebergabe_Stiftungspreis.pdf",
            },
            {
              path:
                process.cwd() +
                "/public/Einverstaendnis_Fotoaufnahmen_Uebergabe_Stiftungspreis.pdf",
            },
            {
              path:
                process.cwd() +
                "/public/Hinweise_Preistraeger_zu_Fotoaufnahmen_Uebergabe_STP.pdf",
            },
            {
              path:
                process.cwd() +
                "/public/Hinweise_und_Checkliste_fuer_Uebergabe.pdf",
            },
          ];
        }
        if (letter.emailProjekt) {
          const resEmail = await transporter.sendMail({
            from: `Town & Country Stiftung <${process.env.SMTP_FROM_EMAIL}>`,
            to: "info@larsknoke.com",
            // to: testMode ? "stiftungspreis@tc-stiftung.de" : letter.emailProjekt,
            // bcc: "stiftungspreis@tc-stiftung.de",
            subject: `11. Town & Country Stiftungspreis: Gratulation – und 1.111 Euro für ${letter.nameProjekt}`,
            html: render(<LetterEmail1 letter={letter} />),
            attachments: attachments,
          });
          return resEmail;
        } else {
          console.error("No Letter");
        }
      });
    const mails = await Promise.all(mailsPromise);

    // ZEITSTEMPEL FÜR EMAIL AUSGANG
    const ids = letters.map((letter) => letter.id);
    if (!testMode) {
      const updatedLetters = await prisma.letter.updateMany({
        where: {
          id: { in: ids },
        },
        data: {
          letteremail1: new Date(),
        },
      });
    }

    console.log("mails", mails);
    return res.status(200).json({ success: true, letters, mails });
  } catch (error) {
    console.log("api error: ", error);
    return res.status(500).json(error);
  }
}
