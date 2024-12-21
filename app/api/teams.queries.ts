import { sql } from "@pgtyped/runtime";
import {
  ICreateTeamQuery,
  IGetAllTeamsQuery,
  IGetTeamQuery,
  IUpdateTeamQuery,
} from "./teams.queries.types.js";

const getAllTeams = sql<IGetAllTeamsQuery>`SELECT id, name FROM teams ORDER BY id`;

const createTeam = sql<ICreateTeamQuery>`INSERT INTO teams (name) VALUES ($name) RETURNING id, name`;

const getTeam = sql<IGetTeamQuery>`SELECT id, name FROM teams WHERE id = $id`;

const updateTeam = sql<IUpdateTeamQuery>`UPDATE teams SET name = $name WHERE id = $id RETURNING id, name`;

// separate export so it is easier to mock in tests
export const teamQueries = {
  getAllTeams,
  createTeam,
  getTeam,
  updateTeam,
};
