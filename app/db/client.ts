import pg, { Client } from "pg";

let client: Promise<Client> | undefined = undefined;

export async function getDbClient() {
  client ??= (async () => {
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
      console.log("Connected to the database");
      return client;
    } catch (e) {
      console.error("Error connecting to the database: ", e);
      throw e;
    }
  })();

  return client;
}
