"use server";

import { Base } from "@/schema/base";
import { PrismaClient } from "../../generated/prisma";

export async function addBase(base: Base) {
  const client = new PrismaClient();
  const response = await client.base.create({
    data: {
      ...base,
    },
  });

  return response;
}

export async function getBases() {
  const client = new PrismaClient();
  const bases = await client.base.findMany();
  return bases;
}
export async function getBaseById(id: number) {
  const client = new PrismaClient();
  const base = await client.base.findUnique({
    where: { id },
  });
  return base;
}

export async function updateBaseById(id: number, base: Base) {
  const client = new PrismaClient();
  const response = client.base.update({
    where: { id },
    data: {
      ...base,
    },
  });
  return response;
}

export async function getBaseMembershipsAmount(id: string) {
  const client = new PrismaClient();

  const membershipsAmount = await client.user.findMany({
    where: { baseId: Number(id) },
  });

  return membershipsAmount.length;
}

export async function deleteBase(id: number) {
  const prisma = new PrismaClient();
  const response = await prisma.base.delete({
    where: { id },
  });
  return response;
}
