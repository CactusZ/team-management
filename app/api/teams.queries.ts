import { sql } from "@pgtyped/runtime";
import {
  ICreateTeamQuery,
  IGetChildTeamsQuery,
  IGetParentTeamCandidatesQuery,
  IGetRootTeamsQuery,
  IGetTeamQuery,
  IUpdateTeamNameQuery,
  IUpdateTeamParentQuery,
} from "./teams.queries.types.js";

const getRootTeams = sql<IGetRootTeamsQuery>`SELECT id, name FROM teams WHERE parent_id IS NULL ORDER BY name`;
const getChildTeams = sql<IGetChildTeamsQuery>`SELECT id, name FROM teams WHERE parent_id = $parent_id ORDER BY name`;
const getParentTeamCandidates = sql<IGetParentTeamCandidatesQuery>`
WITH RECURSIVE child_ids AS (
  SELECT id FROM teams WHERE parent_id = $id
  UNION
  SELECT t.id FROM teams t JOIN child_ids ON t.parent_id = child_ids.id
)

SELECT id, name FROM teams WHERE id NOT IN (SELECT id FROM child_ids) AND id != $id ORDER BY name
`;

const createTeam = sql<ICreateTeamQuery>`INSERT INTO teams (name, parent_id) VALUES ($name, $parent_id) RETURNING id, name`;

const getTeam = sql<IGetTeamQuery>`SELECT id, name FROM teams WHERE id = $id`;

const updateTeamName = sql<IUpdateTeamNameQuery>`UPDATE teams SET name = $name WHERE id = $id RETURNING id, name`;
const updateTeamParent = sql<IUpdateTeamParentQuery>`UPDATE teams SET parent_id = $newParent WHERE id = $id RETURNING id, name`;

// separate export so it is easier to mock in tests
export const teamQueries = {
  getRootTeams,
  getChildTeams,
  getParentTeamCandidates,
  createTeam,
  getTeam,
  updateTeamName,
  updateTeamParent,
};
