import pg from "pg";

export async function getDbClient() {
  try {
    const { Client } = pg;
    const client = new Client({
      user: process.env.POSTGRES_USER,
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
    });
    await client.connect();
    return client;
  } catch (e) {
    console.error("Error connecting to the database: ", e);
    throw e;
  }
}
