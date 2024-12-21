import { getDbClient } from "../db/client.js";
import { runQuery } from "../db/runQuery.js";
import { teamQueries } from "./teams.queries.js";

export interface TeamForm {
  name?: string;
}

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

export async function getTeam({ id }: { id: number }): Promise<Team> {
  const result = await runQuery(teamQueries.getTeam, { id });
  return result[0];
}

export async function updateTeam({
  id,
  name,
}: {
  id: number;
  name: string;
}): Promise<Team> {
  const result = await runQuery(teamQueries.updateTeam, { id, name });
  return result[0];
}
