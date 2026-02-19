import prisma from "@/lib/prisma";
import sha256 from "crypto-js/sha256";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const { email, token, password } = req.body;
  if (!email || !token || !password)
    return res.status(400).json({ ok: false, error: "missing" });

  try {
    const vt = await prisma.verificationToken.findUnique({ where: { token } });
    if (!vt || vt.identifier !== email || new Date(vt.expires) < new Date()) {
      return res
        .status(400)
        .json({ ok: false, error: "invalid or expired token" });
    }

    const hashed = sha256(password).toString();

    await prisma.user.update({ where: { email }, data: { password: hashed } });

    // remove tokens for this identifier
    await prisma.verificationToken.deleteMany({ where: { identifier: email } });

    return res.json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false });
  }
}
