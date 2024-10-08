"use client"
import { SessionProvider } from "next-auth/react"
export default function SessioWrapper ({children}){
    return <SessionProvider>{children}</SessionProvider>
}