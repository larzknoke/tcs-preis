import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import sha256 from "crypto-js/sha256";

export default async function handle(req, res) {
  const session = await getServerSession(req, res, authOptions);
  console.log("session", session);
  if (!session) {
    return res.status(401).json({ error: "401 not authenticated" });
  }

  if (req.method === "POST") {
    await handlePOST(res, req);
  } else if (req.method === "PUT") {
    await handlePUT(res, req);
  } else if (req.method === "DELETE") {
    await handleDELETE(res, req);
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
  // console.log("req.body", req.body);
  delete req.body.password_confirm;
  const user = await prisma.user.create({
    data: { ...req.body, password: hashPassword(req.body.password) },
  });
  res.json(user);
}

async function handlePUT(res, req) {
  delete req.body.password;
  delete req.body.password_confirm;
  const user = await prisma.user.update({
    where: { id: req.body.id },
    data: req.body,
  });
  res.json(user);
}

async function handleDELETE(res, req) {
  const { userId } = req.body;
  const user = await prisma.user.delete({
    where: { id: userId },
  });
  res.json(user);
}
