const { PrismaClient } = require("@prisma/client");
const sha256 = require("crypto-js/sha256");

const prisma = new PrismaClient();

const hashPassword = (password) => {
  return sha256(password).toString();
};

const userData = [
  {
    name: "Lars Knoke",
    email: "info@larsknoke.com",
    password: hashPassword("password"),
  },
];

async function main() {
  console.log(`Start seeding ...`);
  const users = await prisma.user.findMany();
  if (users.length === 0) {
    for (const u of userData) {
      const user = await prisma.user.create({
        data: u,
      });
      console.log(`Created user with id: ${user.id}`);
    }
  }
  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
