import { runQuery } from "../db/runQuery.js";
import { usersQueries } from "./users.queries.js";

export interface User {
  id: number;
  email: string;
  name: string;
}

export async function getUsers({
  teamId,
}: {
  teamId: number;
}): Promise<User[]> {
  return runQuery(usersQueries.getUsersFromTeam, { team_id: teamId });
}

export async function addUserToTeam({
  teamId,
  email,
  name,
}: {
  teamId: number;
  email: string;
  name: string;
}) {
  const results = await runQuery(usersQueries.addUserToTeam, {
    team_id: teamId,
    email,
    name,
  });
  return !!results.length;
}
