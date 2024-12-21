import { getDbClient } from "./client.js";
import { initQueries } from "./init.queries.js";

export async function init() {
  try {
    const client = await getDbClient();
    await initQueries.initQuery.run(undefined as void, client);
    console.log("Database initialized");
  } catch (e) {
    console.error("Error initializing the database: ", e);
    throw e;
  }
}
