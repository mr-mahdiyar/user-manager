import { Admin, PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

async function main() {
  const admins: Array<Admin> = [
    {
      id: 1,
      username: "admin",
      password: "123456",
    },
  ];

  admins.map(async({ id, username, password }) => {
    await prisma.admin.upsert({
      where: { id },
      update: { username, password },
      create: { id, username, password },
    });
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })

  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
