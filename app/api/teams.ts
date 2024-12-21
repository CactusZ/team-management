import { getDbClient } from "../db/client.js";
import { getAllTeams } from "./teams.queries.js";

export interface Team {
  id: number;
  name: string;
}

export async function fetchAllTeams(): Promise<Team[]> {
  const dbClient = await getDbClient();
  const result = await getAllTeams.run({}, dbClient);
  return result;
}
