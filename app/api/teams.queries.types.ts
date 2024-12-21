/** Types generated for queries found in "app/api/teams.queries.ts" */

/** 'GetAllTeams' parameters type */
export type IGetAllTeamsParams = void;

/** 'GetAllTeams' return type */
export interface IGetAllTeamsResult {
  id: number;
  name: string;
}

/** 'GetAllTeams' query type */
export interface IGetAllTeamsQuery {
  params: IGetAllTeamsParams;
  result: IGetAllTeamsResult;
}

/** 'CreateTeam' parameters type */
export interface ICreateTeamParams {
  name?: string | null | void;
}

/** 'CreateTeam' return type */
export interface ICreateTeamResult {
  id: number;
  name: string;
}

/** 'CreateTeam' query type */
export interface ICreateTeamQuery {
  params: ICreateTeamParams;
  result: ICreateTeamResult;
}

/** 'GetTeam' parameters type */
export interface IGetTeamParams {
  id?: number | null | void;
}

/** 'GetTeam' return type */
export interface IGetTeamResult {
  id: number;
  name: string;
}

/** 'GetTeam' query type */
export interface IGetTeamQuery {
  params: IGetTeamParams;
  result: IGetTeamResult;
}

/** 'UpdateTeam' parameters type */
export interface IUpdateTeamParams {
  id?: number | null | void;
  name?: string | null | void;
}

/** 'UpdateTeam' return type */
export interface IUpdateTeamResult {
  id: number;
  name: string;
}

/** 'UpdateTeam' query type */
export interface IUpdateTeamQuery {
  params: IUpdateTeamParams;
  result: IUpdateTeamResult;
}

