import prisma from "@/lib/db";

export async function POST(req:Request){

    const data =await req.json();
    
   const useremail= data.data.user.email;

const user=await prisma.users.findUnique({
    where:{
        email:useremail
    }
})
const obj =await prisma.transaction.findMany({
    where:{
        userId:user?.id
    }
})
    return new Response(JSON.stringify(obj))

}