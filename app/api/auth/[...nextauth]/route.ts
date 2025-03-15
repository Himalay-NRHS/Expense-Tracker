import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
//import pgclient from "@/lib/db";
import prisma from "@/lib/db";
import bcrypt from "bcryptjs";

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
        const passwordMatch = await bcrypt.compare(credentials.password, user.password);

        if (!passwordMatch) {
          throw new Error("Invalid credentials");
        }
       
        return { ...user, id: user.id.toString() };

        
      }
    })
  ]
  })
  export { handler as GET, handler as POST }
