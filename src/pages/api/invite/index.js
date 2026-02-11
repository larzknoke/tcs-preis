import prisma from "@/lib/prisma";
import ConfirmInviteEmail from "@/email/ConfirmInviteEmail";
import ErrorEmail from "@/email/ErrorEmail";
import { sendEmail } from "@/lib/email";
import { render } from "@react-email/render";
import CancelInviteEmail from "@/email/CancelInviteEmail";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handle(req, res) {
  console.log("api call");
  const session = await getServerSession(req, res, authOptions);

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

      const result = await prisma.invite.create({
        data: {
          ...data,
          verified: true,
          verifyId: null,
        },
      });

      if (result.email) {
        // *** ZUSAGE ***
        if (result.teilnahme) {
          const dtstamp =
            new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
          const uid = `stiftungspreis@tc-stiftung.de`;
          const icalContent = `BEGIN:VCALENDAR\nMETHOD:PUBLISH\nPRODID:-//Town & Country Stiftung//tcs-preis//EN\nVERSION:2.0\nBEGIN:VEVENT\nDESCRIPTION:Stiftungsgala zum 12. Town & Country Stiftungspreis in der Zentralheize Erfurt\nLOCATION:Zentralheize Erfurt\nDTEND;TZID=Europe/Berlin:20260509T230000\nDTSTAMP:${dtstamp}\nDTSTART;TZID=Europe/Berlin:20260509T173000\nSEQUENCE:0\nSUMMARY:Stiftungsgala zum 12. Town & Country Stiftungspreis in der Zentralheize Erfurt\nUID:${uid}\nEND:VEVENT\nBEGIN:VTIMEZONE\nTZID:Europe/Berlin\nX-LIC-LOCATION:Europe/Berlin\nEND:VTIMEZONE\nEND:VCALENDAR`;

          await sendEmail({
            to:
              process.env.NODE_ENV === "development"
                ? ["info@larsknoke.com"]
                : result.email,
            bcc:
              process.env.NODE_ENV === "development"
                ? ""
                : "stiftungspreis@tc-stiftung.de",
            subject:
              "12. Town & Country Stiftungsgala – vielen Dank für Ihre Anmeldung",
            html: render(<ConfirmInviteEmail invite={result} />),
            attachments: [
              {
                filename: "stiftungsgala-2026.ics",
                content: icalContent,
                contentType: "text/calendar; method=PUBLISH; charset=UTF-8",
              },
            ],
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
            subject: "12. Town & Country Stiftungsgala – Absage",
            html: render(<CancelInviteEmail invite={result} />),
          });
        }
      } else {
        await sendEmail({
          to: ["info@larsknoke.com"],
          subject: "TC-Stiftung - Stiftungspreis 2025 - Fehler",
          html: render(<ErrorEmail invite={result} />),
        });
      }

      return res.status(200).json({ success: true, result });
    } catch (error) {
      console.log("api error: ", error);
      return res.status(500).json(error);
    }
  }

  if (req.method == "DELETE") {
    if (!session) {
      return res.status(401).json({ message: "not authorzied" });
    }
    const { id } = req.query;
    try {
      const result = await prisma.invite.delete({
        where: { id: parseInt(id) },
      });
      return res.status(200).json({ success: true, result });
    } catch (error) {
      console.log("file delete error: ", error);
      return res.status(500).json({ error: error.message, code: error.code });
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
