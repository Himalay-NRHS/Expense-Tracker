import pgclient from "@/lib/db";
import bcrypt from "bcryptjs";
import prisma from "@/lib/db";
export async function POST(req: Request) {
    try{
    const { name, email, password } = await req.json();  
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await prisma.users.create({
        data:{
            name,
            email,
            password: hashedPassword
        }
    })
    return new Response(JSON.stringify("user created successfully!!!"), { status: 201 });
    }catch(err){
        console.error("Database Error:", err);
        return new Response("Something went wrong", { status: 500 });
    }
}