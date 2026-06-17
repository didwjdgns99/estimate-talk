import { http } from "@/lib/http";

export type SignupRequest = {
  name: string;
  email: string;
  password: string;
};

export type LoginRequest = {
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
  });

  return result;
}
