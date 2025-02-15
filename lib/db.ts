import { Client } from "pg";
const pgclient = new Client({
    user: "postgres",
    host: "localhost",
    database: "expense-tracker",
    password: "himu",
    port: 5432,
  });
const query1 = `CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    amount INT DEFAULT 0
);
`;
const query2=`CREATE TABLE IF NOT EXISTS transactions (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    amount INT NOT NULL,
    transaction_type VARCHAR(50) NOT NULL,  -- e.g., 'expense' or 'credit'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
`

async function main() {
  try {
    await pgclient.connect();
    console.log("Connected to DB");
    await pgclient.query(query1);
    await pgclient.query(query2)
  } catch (err) {
    console.error("Database Error:", err);
  }
}
main()
export default pgclient;
