"use client";
import React, { PropsWithChildren } from "react";
import { SessionProvider } from "next-auth/react";

interface Props {}

const AuthSessionProvider: React.FC<PropsWithChildren<Props>> = ({
  children,
}) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthSessionProvider;
