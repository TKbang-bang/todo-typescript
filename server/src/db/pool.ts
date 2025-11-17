import { Pool } from "pg";

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  password: "soytk",
  database: "typescript",
  port: 5432,
});

export default pool;
