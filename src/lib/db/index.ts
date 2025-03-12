import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import schema from "./schema";

const client = new Pool({
    connectionString: process.env.DB_URL!,
});

const db = drizzle({client, schema});

export default db;