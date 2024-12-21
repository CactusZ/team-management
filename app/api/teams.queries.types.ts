/** Types generated for queries found in "app/api/teams.queries.ts" */

/** 'GetRootTeams' parameters type */
export type IGetRootTeamsParams = void;

/** 'GetRootTeams' return type */
export interface IGetRootTeamsResult {
  id: number;
  name: string;
}

/** 'GetRootTeams' query type */
export interface IGetRootTeamsQuery {
  params: IGetRootTeamsParams;
  result: IGetRootTeamsResult;
}

/** 'GetChildTeams' parameters type */
export interface IGetChildTeamsParams {
  parent_id?: number | null | void;
}

/** 'GetChildTeams' return type */
export interface IGetChildTeamsResult {
  id: number;
  name: string;
}

/** 'GetChildTeams' query type */
export interface IGetChildTeamsQuery {
  params: IGetChildTeamsParams;
  result: IGetChildTeamsResult;
}

/** 'GetParentTeamCandidates' parameters type */
export interface IGetParentTeamCandidatesParams {
  id?: number | null | void;
}

/** 'GetParentTeamCandidates' return type */
export interface IGetParentTeamCandidatesResult {
  id: number;
  name: string;
}

/** 'GetParentTeamCandidates' query type */
export interface IGetParentTeamCandidatesQuery {
  params: IGetParentTeamCandidatesParams;
  result: IGetParentTeamCandidatesResult;
}

/** 'CreateTeam' parameters type */
export interface ICreateTeamParams {
  name?: string | null | void;
  parent_id?: number | null | void;
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
  parent_id: number;
  parent_name: string;
}

/** 'GetTeam' query type */
export interface IGetTeamQuery {
  params: IGetTeamParams;
  result: IGetTeamResult;
}

/** 'UpdateTeamName' parameters type */
export interface IUpdateTeamNameParams {
  id?: number | null | void;
  name?: string | null | void;
}

/** 'UpdateTeamName' return type */
export interface IUpdateTeamNameResult {
  id: number;
  name: string;
}

/** 'UpdateTeamName' query type */
export interface IUpdateTeamNameQuery {
  params: IUpdateTeamNameParams;
  result: IUpdateTeamNameResult;
}

/** 'UpdateTeamParent' parameters type */
export interface IUpdateTeamParentParams {
  id?: number | null | void;
  newParent?: number | null | void;
}

/** 'UpdateTeamParent' return type */
export interface IUpdateTeamParentResult {
  id: number;
  name: string;
}

/** 'UpdateTeamParent' query type */
export interface IUpdateTeamParentQuery {
  params: IUpdateTeamParentParams;
  result: IUpdateTeamParentResult;
}

