"use client"

import {createContext , useContext} from "react"

export type User = {
  id: string;
  name: string;
  email: string;
};

export type UserProps = {
  user: User | null;
};

type UserProviderProps = {
  user: User | null;
  children: React.ReactNode;
};

const UserContext = createContext<UserProps | undefined>(undefined)

export default function UserProvider({user,children}:UserProviderProps){
    return (
        <UserContext.Provider value={{user}}>
            {children}
        </UserContext.Provider>
    )

}

export function useUser() {
    const context = useContext(UserContext)

    if(context === undefined){
        throw new Error("useUser는 UserProvider 안에서 사용해야 합니다.")
    }

    return context
}