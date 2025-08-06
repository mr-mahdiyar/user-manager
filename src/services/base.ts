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
