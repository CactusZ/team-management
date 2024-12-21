import { sql } from "@pgtyped/runtime";
import { getDbClient } from "./client.js";

const initQuery = sql`
CREATE TABLE IF NOT EXISTS teams (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);
`;

export const initQueries = {
  initQuery,
};
