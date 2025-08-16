"use server";

import { PrismaClient, User } from "@/../generated/prisma";

export async function addMembership(newMember: Omit<User, "id">) {
  const client = new PrismaClient();
  const result = client.user.upsert({
    where: { nationalCode: newMember.nationalCode },
    update: { ...newMember },
    create: { ...newMember },
  });

  return result;
}

export async function checkNationalCodeExistence(nationalCode: string) {
  const client = new PrismaClient();

  const user = await client.user.findUnique({
    where: {
      nationalCode,
    },
  });

  return !Boolean(user);
}

export async function checkCaseNumberExistence(caseNumber: string) {
  const client = new PrismaClient();

  const user = await client.user.findFirst({
    where: {
      caseNumber,
    },
  });

  return !Boolean(user);
}

export async function getMembershipByNationalCode(nationalCode: string) {
  const prisma = new PrismaClient();
  return await prisma.user.findUnique({
    where: { nationalCode },
  });
}
