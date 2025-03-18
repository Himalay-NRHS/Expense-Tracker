import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
//import pgclient from "@/lib/db";
import prisma from "@/lib/db";
import bcrypt from "bcryptjs";
if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error('Missing Google client ID or secret');
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
    
      credentials: {
        email: { label: "email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }
        const user = await prisma.users.findUnique({
          where:{email:credentials?.email}
        })
       
        if(!user){
          throw new Error("Invalid email or password");
        }
        const passwordMatch = await bcrypt.compare(credentials.password, user.password!);

        if (!passwordMatch) {
          throw new Error("Invalid credentials");
        }
       
        return { ...user, id: user.id.toString() };

        
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }

    })
  ], callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        // Check if user exists in DB, else create new user
        const existingUser = await prisma.users.findUnique({
          where: { email: profile?.email },
        });

        if (!existingUser) {
          await prisma.users.create({
            data: {
              email: profile?.email!,
              name: profile?.name!,
              password: "NULL",
            },
          });
        }
      }
      return true;
    },
    async session({ session, user, token }) {
      if (session.user && token.email) {
        session.user.email = token.email;
      }
      
      return session;
    },
  },
});

 
  export { handler as GET, handler as POST }
