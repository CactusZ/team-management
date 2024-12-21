import { sql } from "@pgtyped/runtime";
import { IGetAllTeamsQuery } from "./teams.queries.types.js";

export const getAllTeams = sql<IGetAllTeamsQuery>`SELECT id, name FROM teams`;
