"use server";

import { cookies } from "next/headers";

export async function getAuthCookie() {
  const token = (await cookies()).get("token")?.value;
  return token ? `token=${token}` : undefined;
}
