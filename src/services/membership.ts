"use server";

import { PrismaClient, User } from "@prisma/client";

export async function addMembership(newMember: Omit<User, "id">) {
  const client = new PrismaClient();
  const result = await client.user.upsert({
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
  const foundedUser = await prisma.user.findUnique({
    where: { nationalCode },
  });

  if (!foundedUser) throw new Error("User not found.");
  return foundedUser;
}

export async function getMemberships() {
  const prisma = new PrismaClient();
  const users = await prisma.user.findMany();
  return users;
}

export async function deleteMembership(nationalCode: string) {
  const prisma = new PrismaClient();
  const response = await prisma.user.delete({
    where: { nationalCode },
  });
  return response;
}
