"use server";

import { cookies } from "next/headers";

export async function login() {
  const cookieStore = await cookies();
  const now = new Date();
  cookieStore.set("token", now.toString());
}

export async function getToken() {
  const cookieStore = await cookies();

  if (cookieStore.has("token")) return cookieStore.get("token")?.value;
}

export async function refresh() {
  const cookieStore = await cookies();

  const now = new Date();
  const newExpirationDate = new Date(now.setMinutes(now.getMinutes() + 15));

  cookieStore.set("token", newExpirationDate.toString());
}

export async function isUserLoggedIn() {
  const cookieStore = await cookies();
  return cookieStore.has("token");
}
