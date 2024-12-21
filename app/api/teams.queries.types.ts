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

