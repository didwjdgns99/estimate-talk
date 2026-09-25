"use server";

import { cookies } from "next/headers";

export async function getAuthCookie() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  console.log("getAuthCookie token 존재:", !!token);

  return token ? `token=${token}` : undefined;
}
