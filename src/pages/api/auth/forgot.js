import prisma from "@/lib/prisma";
import { v4 as uuidv4 } from "uuid";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const { email } = req.body;
  if (!email)
    return res.status(400).json({ ok: false, error: "missing email" });

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      // respond OK to avoid user enumeration
      return res.json({ ok: true });
    }

    const token = uuidv4();
    const expires = new Date(Date.now() + 60 * 60 * 1000); // 1h

    await prisma.verificationToken.create({
      data: {
        identifier: email,
        token,
        expires,
      },
    });

    const base = process.env.NEXTAUTH_URL || "";
    const resetUrl = `${base}/auth/reset?token=${encodeURIComponent(token)}&email=${encodeURIComponent(email)}`;

    // In production you'd send an email here (nodemailer is available).
    console.log("Password reset URL:", resetUrl);

    if (process.env.NODE_ENV === "development") {
      return res.json({ ok: true, resetUrl, token });
    }

    return res.json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false });
  }
}
