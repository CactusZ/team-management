/** Types generated for queries found in "app/api/teams.queries.ts" */

/** 'GetAllTeams' parameters type */
export type IGetAllTeamsParams = {};

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
