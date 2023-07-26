import prisma from "@/lib/prisma";
import sha256 from "crypto-js/sha256";

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
  console.log("creating user", {
    ...req.body,
    password: hashPassword(req.body.password),
  });
  const user = await prisma.user.create({
    data: { ...req.body, password: hashPassword(req.body.password) },
  });
  res.json(user);
}
