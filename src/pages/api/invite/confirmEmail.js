import { sendEmail } from "@/lib/email";
import { render } from "@react-email/render";
import ConfirmInviteEmail from "@/email/ConfirmInviteEmail";

export default async function handle(req, res) {
  console.log("api call");

  try {
    // console.log("req.body", req.body);
    const { invite } = req.body;
    if (invite && invite.verified) {
      const dtstamp =
        new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
      const uid = `stiftungspreis@tc-stiftung.de`;
      const icalContent = `BEGIN:VCALENDAR\nMETHOD:PUBLISH\nPRODID:-//Town & Country Stiftung//tcs-preis//EN\nVERSION:2.0\nBEGIN:VEVENT\nDESCRIPTION:Stiftungsgala zum 12. Town & Country Stiftungspreis in der Zentralheize Erfurt\nLOCATION:Zentralheize Erfurt\nDTEND;TZID=Europe/Berlin:20260509T230000\nDTSTAMP:${dtstamp}\nDTSTART;TZID=Europe/Berlin:20260509T173000\nSEQUENCE:0\nSUMMARY:Stiftungsgala zum 12. Town & Country Stiftungspreis in der Zentralheize Erfurt\nUID:${uid}\nEND:VEVENT\nBEGIN:VTIMEZONE\nTZID:Europe/Berlin\nX-LIC-LOCATION:Europe/Berlin\nEND:VTIMEZONE\nEND:VCALENDAR`;

      await sendEmail({
        to:
          process.env.NODE_ENV === "development"
            ? "info@larsknoke.com"
            : invite.email,
        bcc:
          process.env.NODE_ENV === "development"
            ? ""
            : "stiftungspreis@tc-stiftung.de",
        subject:
          "12. Town & Country Stiftungsgala – vielen Dank für Ihre Anmeldung",
        html: render(<ConfirmInviteEmail invite={invite} />),
        attachments: [
          {
            filename: "stiftungsgala-2026.ics",
            content: icalContent,
            contentType: "text/calendar; method=PUBLISH; charset=UTF-8",
          },
        ],
      });
    } else {
      throw new Error("No Invite");
    }

    return res.status(200).json({ success: true, invite });
  } catch (error) {
    console.log("api error: ", error);
    return res.status(500).json(error);
  }
}
