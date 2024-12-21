import { sql } from "@pgtyped/runtime";
import { getDbClient } from "./client.js";

const initTeams = sql`
CREATE TABLE IF NOT EXISTS teams (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  parent_id INT,
  FOREIGN KEY (parent_id) REFERENCES teams(id)
);`;

const initUsers = sql`CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL
)`;

const initTeamUsers = sql`CREATE TABLE IF NOT EXISTS team_users (
  team_id INT,
  user_id INT,
  FOREIGN KEY (team_id) REFERENCES teams(id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  PRIMARY KEY (team_id, user_id)
)`;

export const initQueries = {
  initTeams,
  initUsers,
  initTeamUsers,
};
