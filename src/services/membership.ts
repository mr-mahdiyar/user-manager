"use server";

import { PrismaClient, User, Prisma } from "../../generated/prisma";

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

export async function searchMemberships(filters: {
  firstName: string;
  lastName: string;
  nationalCode: string;
  caseNumber: string;
  // status: number;
  baseId: number;
}) {
  const client = new PrismaClient();

  try {
    const whereClause: Prisma.UserWhereInput = {};

    if (filters.firstName) {
      whereClause.name = {
        contains: filters.firstName,
      };
    }

    if (filters.lastName) {
      whereClause.family = {
        contains: filters.lastName,
      };
    }

    if (filters.nationalCode && filters.nationalCode.trim() !== "") {
      whereClause.nationalCode = {
        contains: filters.nationalCode.trim(),
      };
    }

    // فیلتر شماره پرونده
    if (filters.caseNumber && filters.caseNumber.trim() !== "") {
      whereClause.caseNumber = {
        contains: filters.caseNumber.trim(),
      };
    }
    // whereClause.statusId = filters.status;
    // فیلتر پایگاه
    if (filters.baseId !== -1) {
      whereClause.baseId = filters.baseId;
    }
    console.log(whereClause);
    const users = await client.user.findMany({
      where: whereClause,
      include: {
        // status: true,
        base: true,
      },
      orderBy: [{ family: "asc" }, { name: "asc" }],
    });

    console.log("users: ", users);
    return users;
  } catch (error) {
    console.error("خطا در جستجوی کاربران:", error);
    throw error;
  }
}
