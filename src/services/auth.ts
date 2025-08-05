"use server";

import { cookies } from "next/headers";

export async function login() {
  const cookieStore = await cookies();
  const now = new Date();
  now.setMinutes(now.getMinutes() + 15);
  cookieStore.set("token", now.getTime().toString());
}

export async function getToken() {
  const cookieStore = await cookies();
  if (cookieStore.has("token")) return cookieStore.get("token")?.value;
}

export async function refresh() {
  const cookieStore = await cookies();

  const now = new Date();
  const fifteenMinutesLater = new Date(now.setMinutes(now.getMinutes() + 15));
  cookieStore.set("token", fifteenMinutesLater.getTime().toString());
}

export async function isUserLoggedIn() {
  const cookieStore = await cookies();
  return cookieStore.has("token");
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("token");
}

export async function isSessionValid() {

  const expirationDate = await getToken();
  const now = new Date();
  const nowInMs = now.getTime();
  
  return nowInMs < Number(expirationDate);
}
