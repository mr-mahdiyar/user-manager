import { Admin, Base, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const admins: Array<Admin> = [
    {
      id: 1,
      username: "admin",
      password: "123456",
    },
  ];
  const bases: Array<Base> = [
    {
      id: 0,
      leader: "کاظم غلامرضایی",
      location: "لطف آباد",
      name: "شهید رجایی",
    },
  ];

  Promise.all([
    admins.map(async ({ id, username, password }) => {
      await prisma.admin.upsert({
        where: { id },
        update: { username, password },
        create: { id, username, password },
      });
    }),
    bases.map(async ({ id, leader, location, name }) => {
      await prisma.base.upsert({
        where: { id },
        update: { leader, location, name },
        create: { id, leader, location, name },
      });
    }),
  ]);
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
