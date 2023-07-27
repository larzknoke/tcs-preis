import prisma from "@/lib/prisma";
import sha256 from "crypto-js/sha256";
import { omit } from "lodash";

export default async function handle(req, res) {
  if (req.method === "POST") {
    await handlePOST(res, req);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}

const hashPassword = (password) => {
  return sha256(password).toString();
};

// POST /api/user
async function handlePOST(res, req) {
  try {
    const user = await prisma.user.findUnique({
      where: { email: req.body.username },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        password: true,
      },
    });
    if (user && user.password == hashPassword(req.body.password)) {
      console.log("user: ", user);
      res.json(omit(user, "password"));
    }
  } catch (error) {
    console.log("error: ", error);
    res.status(400).end("Invalid credentials");
  }
}
