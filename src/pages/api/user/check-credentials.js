import prisma from "@/lib/prisma";
import sha256 from "crypto-js/sha256";
import { omit } from "lodash";

export default async function handle(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res
      .status(405)
      .end(`The HTTP ${req.method} method is not supported at this route.`);
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: req.body?.email },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        password: true,
      },
    });

    const hashPassword = (password) => sha256(password).toString();

    if (user && user.password === hashPassword(req.body?.password)) {
      console.log("user: ", user);
      return res.json(omit(user, "password"));
    }

    // Always send a response for invalid credentials to avoid request hang
    return res.status(401).json({ error: "Invalid credentials" });
  } catch (error) {
    console.log("error: ", error);
    return res.status(500).json({ error: "Server error" });
  }
}
