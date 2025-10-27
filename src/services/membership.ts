"use server";

import { PrismaClient, Prisma, User } from "@prisma/client";

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

export async function getMemberships(page: number = 1) {
  const prisma = new PrismaClient();
  const pageSize = 10;
  const skip = (page - 1) * pageSize;

  // دریافت کاربران صفحه فعلی
  const users = await prisma.user.findMany({
    skip: skip,
    take: pageSize,
  });

  // دریافت تعداد کل کاربران
  const totalUsers = await prisma.user.count();

  // محاسبه اینکه آیا صفحه بعدی وجود دارد
  const hasNextPage = skip + pageSize < totalUsers;

  return {
    users,
    hasNextPage,
    currentPage: page,
    totalPages: Math.ceil(totalUsers / pageSize),
    totalUsers,
  };
}

export async function deleteMembership(nationalCode: string) {
  const prisma = new PrismaClient();
  const response = await prisma.user.delete({
    where: { nationalCode },
  });
  return response;
}

export async function searchMemberships(
  filters: {
    firstName: string;
    lastName: string;
    nationalCode: string;
    caseNumber: string;
    // status: number;
    baseId: number;
  },
  page: number = 1
) {
  console.log("searched.")
  const client = new PrismaClient();

  try {
    const pageSize = 10;
    const skip = (page - 1) * pageSize;

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

    // دریافت کاربران با صفحه‌بندی
    const users = await client.user.findMany({
      where: whereClause,
      include: {
        // status: true,
        base: true,
      },
      skip: skip,
      take: pageSize,
    });

    // دریافت تعداد کل کاربران با فیلترهای اعمال شده
    const totalUsers = await client.user.count({
      where: whereClause,
    });

    // محاسبه اینکه آیا صفحه بعدی وجود دارد
    const hasNextPage = skip + pageSize < totalUsers;

    return {
      users,
      hasNextPage,
      currentPage: page,
      totalPages: Math.ceil(totalUsers / pageSize),
      totalUsers,
    };
  } catch (error) {
    console.error("خطا در جستجوی کاربران:", error);
    throw error;
  } finally {
    await client.$disconnect();
  }
}
