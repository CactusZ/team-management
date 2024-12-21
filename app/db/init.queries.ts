import { sql } from "@pgtyped/runtime";
import { getDbClient } from "./client.js";

const initQuery = sql`
CREATE TABLE IF NOT EXISTS teams (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  parent_id INT,
  FOREIGN KEY (parent_id) REFERENCES teams(id)
);
`;

export const initQueries = {
  initQuery,
};
