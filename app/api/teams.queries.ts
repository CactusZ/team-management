import { sql } from "@pgtyped/runtime";
import {
  ICreateTeamQuery,
  IGetChildTeamsQuery,
  IGetParentTeamCandidatesQuery,
  IGetPathToTeamQuery,
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

const getTeam = sql<IGetTeamQuery>`
SELECT team.id, team.name, parent.id parent_id, parent.name parent_name FROM teams AS team LEFT JOIN teams AS parent ON parent.id = team.parent_id WHERE team.id = $id
`;

const getPathToTeam = sql<IGetPathToTeamQuery>`
  WITH RECURSIVE path AS (
    SELECT id, name, parent_id FROM teams WHERE id = $id
    UNION
    SELECT t.id, t.name, t.parent_id 
    FROM teams AS t 
    JOIN path ON path.parent_id = t.id
  )
  SELECT id, name FROM path
`;

const updateTeamName = sql<IUpdateTeamNameQuery>`UPDATE teams SET name = $name WHERE id = $id RETURNING id, name`;
const updateTeamParent = sql<IUpdateTeamParentQuery>`
WITH RECURSIVE child_ids AS (
  SELECT id FROM teams WHERE parent_id = $id
  UNION
  SELECT t.id FROM teams t JOIN child_ids ON t.parent_id = child_ids.id
)
UPDATE teams SET parent_id = $newParent WHERE id = $id AND $newParent NOT IN (SELECT id FROM child_ids) RETURNING id, name
`;

// separate export so it is easier to mock in tests
export const teamQueries = {
  getRootTeams,
  getChildTeams,
  getParentTeamCandidates,
  getPathToTeam,
  createTeam,
  getTeam,
  updateTeamName,
  updateTeamParent,
};
