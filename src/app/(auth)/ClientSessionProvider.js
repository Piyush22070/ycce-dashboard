// ClientSessionProvider.js (client-side provider)
"use client"; // Use this only here

import { SessionProvider } from "next-auth/react";

export default function ClientSessionProvider({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}
