"use client";

import { useSession } from "next-auth/react";
import { Session } from "next-auth";

const useClientAuth = () => {
  const { data: session } = useSession();
  const isAuthenticated = (): boolean => !!session;
  const getUser = (): Session["user"] | null => session?.user || null;
  return {
    isAuthenticated,
    getUser,
    session,
  };
};

export default useClientAuth;
