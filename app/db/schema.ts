import { getDbClient } from "./client.js";

export async function init() {
  const client = await getDbClient();
  await client.query(`
    CREATE TABLE IF NOT EXISTS teams (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL
    );
  `);
}
