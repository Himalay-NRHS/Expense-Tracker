import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import pgclient from "@/lib/db";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
    
      credentials: {
        email: { label: "email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
  
        
        const res = await pgclient.query("SELECT * FROM users WHERE email = $1 AND password = $2", [credentials?.email, credentials?.password]);
        const user = res.rows[0];


        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null
  
        }
      }
    })
  ]
  })
  export { handler as GET, handler as POST }
