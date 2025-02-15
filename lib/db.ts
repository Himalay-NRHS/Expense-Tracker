import {Client } from "pg"
const pgclient=new Client(process.env.DATABASE_URL)