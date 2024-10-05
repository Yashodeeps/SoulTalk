"use client";

import { SessionProvider } from "next-auth/react";
import React from "react";
import { MessageProvider } from "./AppContext";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <SessionProvider>
        <MessageProvider>{children}</MessageProvider>
      </SessionProvider>
    </div>
  );
};

export default Providers;
