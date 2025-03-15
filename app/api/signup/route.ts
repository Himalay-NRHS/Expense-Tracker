import pgclient from "@/lib/db";

export async function POST(req: Request) {
    try{
    const { name, email, password } = await req.json();  
    const result = await pgclient.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *", [name, email, password]);
    const user = result.rows[0];
    return new Response(JSON.stringify(user), { status: 201 });
    }catch(err){
        console.error("Database Error:", err);
        return new Response("Something went wrong", { status: 500 });
    }
}