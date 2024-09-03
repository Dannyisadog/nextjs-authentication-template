"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { ProviderContextType } from "./constants";
import { Session, User } from "next-auth";
import { getSession } from "next-auth/react";
import { CustomSession } from "auth";

interface ProviderProps {
  children: React.ReactNode;
  session: CustomSession;
}

const ProviderContext = createContext<ProviderContextType>(
  {} as ProviderContextType
);

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const Provider = (props: ProviderProps) => {
  const { children, session } = props;

  const [currentSession, setCurrentSession] = useState<CustomSession>(session);

  const [users, setUsers] = useState<User[]>([]);

  const updateSession = async () => {
    const newSession = (await getSession()) as CustomSession;

    if (!newSession) return;

    setCurrentSession(newSession);
  };

  const updateUsers = async () => {
    const response = await fetch(`${apiUrl}/users`);
    const data = await response.json();
    setUsers(data);
  };

  useEffect(() => {
    updateUsers();
  }, []);

  return (
    <ProviderContext.Provider
      value={{
        session: currentSession,
        updateSession,
        users,
        updateUsers,
      }}
    >
      {children}
    </ProviderContext.Provider>
  );
};

export const useProvider = () => {
  const context = useContext(ProviderContext);

  if (!context) {
    throw new Error("useProvider must be used within a Provider");
  }

  return context;
};

export default Provider;
