import { sendEmail } from "@/lib/email";
import { render } from "@react-email/render";
import ConfirmInviteEmail from "@/email/ConfirmInviteEmail";

export default async function handle(req, res) {
  console.log("api call");

  try {
    // console.log("req.body", req.body);
    const { invite } = req.body;
    if (invite && invite.verified) {
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
