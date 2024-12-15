import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

// Define the NextAuth configuration
const authOptions: NextAuthOptions = {
  providers: [
    // GitHub Provider (uncomment if needed)
    // GithubProvider({
    //   clientId: process.env.GITHUB_ID as string,
    //   clientSecret: process.env.GITHUB_SECRET as string,
    // }),

    // Google Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET as string,
};

// Initialize the NextAuth handler
const handler = NextAuth(authOptions);

// Export handler as GET and POST methods for Next.js API routes
export { handler as GET, handler as POST };
