// "use server";

// import { cookies } from "next/headers";

// export async function getAuthCookie() {
//   const token = (await cookies()).get("token")?.value;
//   return token ? `token=${token}` : undefined;
// }

"use server";

import { cookies, headers } from "next/headers";

export async function getAuthToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (token) {
    return token;
  }

  const requestHeaders = await headers();
  const cookieHeader = requestHeaders.get("cookie") ?? "";
  const cookie = cookieHeader
    .split(";")
    .map((item) => item.trim())
    .find((item) => item.startsWith("token="));

  if (!cookie) {
    return undefined;
  }

  return decodeURIComponent(cookie.split("=").slice(1).join("="));
}

export async function getAuthCookie() {
  const token = await getAuthToken();

  console.log("getAuthCookie token 존재:", !!token);

  return token ? `token=${token}` : undefined;
}
