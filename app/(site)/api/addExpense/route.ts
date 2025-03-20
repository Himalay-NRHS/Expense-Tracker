import prisma from "@/lib/db"

export   async function POST(req:Request){
    try{
        const res= await req.json();

        // {
        //     amount: 21,
        //     transactionType: 'expense',
        //     expensecategory: null,
        //     expensename: null ,
        //     description: '21',
        //     createdAt: '2025-03-19T13:50:58.385Z',
        //     email: '1@1'
        //   }this is the format of data thats getting recived here 

        const user=await prisma.users.findUnique({
            where:{
                email:res.email
            }
        })
        console.log(user);
        
        if (!user) {
            return new Response("User not found", { status: 404 });
        }
        
        const tran =await prisma.transaction.create({
            data :{
                userId: user.id,
                amount:res.amount,
                transactionType:res.transactionType,
                expensecategory:res.expensecategory,
                expensename:res.expensename,   
                description:res.description,
                createdAt: new Date(res.createdAt)
            }
        })
console.log(tran)
        return new Response(JSON.stringify("done"), {
            headers: { "Content-Type": "application/json" },
            status: 201
        });
    }
    catch(err){
        console.error("Database Error:", err);
        return new Response("Something went wrong", { status: 500 });
    }
}