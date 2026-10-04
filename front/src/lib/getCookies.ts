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
  const accessToken = cookieStore.get("accessToken")?.value;

  if (accessToken) {
    return accessToken;
  }

  const requestHeaders = await headers();
  const cookieHeader = requestHeaders.get("cookie") ?? "";
  const cookie = cookieHeader
    .split(";")
    .map((item) => item.trim())
    .find((item) => item.startsWith("accessToken="));

  if (!cookie) {
    return undefined;
  }

  return decodeURIComponent(cookie.split("=").slice(1).join("="));
}

export async function getAuthCookie() {
  const accessToken = await getAuthToken();

  console.log("getAuthCookie accessToken 존재:", !!accessToken);

  return accessToken ? `accessToken=${accessToken}` : undefined;
}
