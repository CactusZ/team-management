import { sql } from "@pgtyped/runtime";
import { ICreateTeamQuery, IGetAllTeamsQuery } from "./teams.queries.types.js";

const getAllTeams = sql<IGetAllTeamsQuery>`SELECT id, name FROM teams`;

const createTeam = sql<ICreateTeamQuery>`INSERT INTO teams (name) VALUES ($name) RETURNING id, name`;

export const teamQueries = {
  getAllTeams,
  createTeam,
};
