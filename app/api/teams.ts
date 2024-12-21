import { getDbClient } from "../db/client.js";
import { runQuery } from "../db/runQuery.js";
import { teamQueries } from "./teams.queries.js";

export interface Team {
  id: number;
  name: string;
}

export async function fetchAllTeams(): Promise<Team[]> {
  const dbClient = await getDbClient();
  const result = await teamQueries.getAllTeams.run(undefined as void, dbClient);
  return result;
}

export async function createTeam(): Promise<Team> {
  const defaultTeamName = "New Team";
  const result = await runQuery(teamQueries.createTeam, {
    name: defaultTeamName,
  });
  return result[0];
}
