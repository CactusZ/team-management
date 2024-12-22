import { sql } from "@pgtyped/runtime";

const initTeams = [
  sql`
    CREATE TABLE IF NOT EXISTS teams (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      parent_id INT,
      FOREIGN KEY (parent_id) REFERENCES teams(id) ON DELETE CASCADE
    );`,
  sql`CREATE INDEX IF NOT EXISTS teams_parent_id_idx ON teams(parent_id);`,
  sql`CREATE INDEX IF NOT EXISTS teams_parent_id_name_idx ON teams(parent_id, name);`,
];

const initUsers = [
  sql`CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL
)`,
];

const initTeamUsers = [
  sql`CREATE TABLE IF NOT EXISTS team_users (
    team_id INT,
    user_id INT,
    FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    PRIMARY KEY (team_id, user_id)
  )`,
  sql`CREATE INDEX IF NOT EXISTS team_users_user_id_idx ON team_users(user_id);`,
];

export const initQueries = [...initTeams, ...initUsers, ...initTeamUsers];
