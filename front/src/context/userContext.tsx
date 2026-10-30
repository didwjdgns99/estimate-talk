"use client";

import { createContext, useContext } from "react";
import { useGetMe } from "@/app/hook/auth/useGetMe";

export type User = {
  id: string;
  name: string;
  email: string;
};

export type UserProps = {
  user: User | null;
  isPending: boolean;
  isError: boolean;
};

type UserProviderProps = {
  children: React.ReactNode;
};

const UserContext = createContext<UserProps | undefined>(undefined);

export default function UserProvider({ children }: UserProviderProps) {
  const { data, isPending, isError } = useGetMe();

  const user = data?.user ?? null;

  return (
    <UserContext.Provider value={{ user, isPending, isError }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUser는 UserProvider 안에서 사용해야 합니다.");
  }

  return context;
}
