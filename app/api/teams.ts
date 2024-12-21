import { runQuery } from "../db/runQuery.js";
import { teamQueries } from "./teams.queries.js";

export interface TeamForm {
  name?: string;
}

export interface Team {
  id: number;
  name: string;
  parent_id?: number;
}

export async function getTeams({
  parentId,
}: {
  parentId?: number;
} = {}): Promise<Team[]> {
  const result = parentId
    ? await runQuery(teamQueries.getChildTeams, { parent_id: parentId })
    : await runQuery(teamQueries.getRootTeams);
  return result;
}

export async function getChildTeams({
  parentId,
}: {
  parentId: number;
}): Promise<Team[]> {
  const result = await runQuery(teamQueries.getChildTeams, {
    parent_id: parentId,
  });
  return result;
}

export async function getParentTeamCandidates({
  teamId,
}: {
  teamId: number;
}): Promise<Team[]> {
  const result = await runQuery(teamQueries.getParentTeamCandidates, {
    id: teamId,
  });
  return result;
}

export async function createTeam({
  parentId,
}: {
  parentId?: number;
} = {}): Promise<Team> {
  const defaultTeamName = "New Team";
  const result = await runQuery(teamQueries.createTeam, {
    name: defaultTeamName,
    parent_id: parentId || null,
  });
  return result[0];
}

export async function getTeam({ id }: { id: number }): Promise<Team> {
  const result = await runQuery(teamQueries.getTeam, { id });
  return result[0];
}

export async function updateTeamName({
  id,
  name,
}: {
  id: number;
  name: string;
}): Promise<boolean> {
  const result = await runQuery(teamQueries.updateTeamName, { id, name });
  return !!result[0];
}

export async function updateTeamParent({
  id,
  newParent,
}: {
  id: number;
  newParent: number;
}): Promise<boolean> {
  const result = await runQuery(teamQueries.updateTeamParent, {
    id,
    newParent,
  });
  return !!result[0];
}
