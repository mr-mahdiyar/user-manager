"use server"

import { PrismaClient } from "@prisma/client";

export async function findAdmin(username: string, password: string) {

  const prisma = new PrismaClient();

  const admin = await prisma.admin.findFirst({
    where: { username, password },
  });

  return admin;
}
