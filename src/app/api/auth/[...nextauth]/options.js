// Assuming loginDatabase and authenticateUser are properly implemented and imported
import { authenticateUser } from "@/app/api/database/singlestore";
import CredentialsProvider from "next-auth/providers/credentials";

export const options = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Check for credentials presence
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }

        // Use the authenticateUser function to verify the user's credentials.
        // This function now handles password hashing comparison using bcrypt.
        const user = await authenticateUser(credentials.email, credentials.password);

        if (user) {
          console.log("Authentication successful");
          // Return the user object without the password for NextAuth to use
          // Note: The user object returned from authenticateUser should already exclude the passwordHash
          return { id: user.id, email: user.email, role: user.role };
        } else {
          console.log("Authentication failed");
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      if (session?.user) session.user.role = token.role;
      return session;
    },
    async redirect({ baseUrl }) {
      // Redirect to /dashboard after successful sign-in
      return `${baseUrl}/dashboard`;
    },
  },
  pages: {
    // signIn: '/auth/signin', // Optional: specify a custom sign-in page
    redirect: '/dashboard', // Redirect to /dashboard after successful sign-in
  },
};