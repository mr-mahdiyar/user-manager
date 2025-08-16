"use server";

import { PrismaClient, User } from "@/../generated/prisma";

export async function addMembership(newMember: Omit<User, "id">) {
  const client = new PrismaClient();
  const result = client.user.create({
    data: newMember,
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
