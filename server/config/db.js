import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on("connect", () => {
  console.log("✅ PostgreSQL Connected Successfully");
});

pool.on("error", (err) => {
  console.error("❌ PostgreSQL Error:", err.message);
});

export default pool;