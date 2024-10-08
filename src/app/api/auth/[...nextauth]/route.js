"use client"
import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

const handler  = NextAuth( {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: Ov23li9ubAb2rMtEjwQc,
      clientSecret: c615c2a3d0710e6462ca9881ea40375e5e8c32f0,
    }),
    // ...add more providers here
  ],
})

export {handler as GET , handler as POST}