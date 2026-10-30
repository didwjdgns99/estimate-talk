import { http } from "@/lib/http";
import { headers } from "next/headers";

export type SignupRequest = {
  name: string;
  email: string;
  password: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type User = {
  name: string;
  email: string;
  password: string;
};

export function signup(payload: SignupRequest) {
  const result = http("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  return result;
}

export function login(payload: LoginRequest) {
  const result = http("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
    credentials: "include",
  });

  return result;
}

export async function getMe() {
  return http(
    "/api/auth/me",
    {
      method: "GET",
      cache: "no-store",
    },
    {
      authRequired: true,
    },
  );
}

export async function logout() {
  const result = http("/api/auth/logout", {
    method: "POST",
  });
  return result;
}
