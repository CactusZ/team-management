/** Types generated for queries found in "app/api/users.queries.ts" */

/** 'GetUsersFromTeam' parameters type */
export interface IGetUsersFromTeamParams {
  team_id?: number | null | void;
}

/** 'GetUsersFromTeam' return type */
export interface IGetUsersFromTeamResult {
  email: string;
  id: number;
  name: string;
}

/** 'GetUsersFromTeam' query type */
export interface IGetUsersFromTeamQuery {
  params: IGetUsersFromTeamParams;
  result: IGetUsersFromTeamResult;
}

/** 'AddUserToTeam' parameters type */
export interface IAddUserToTeamParams {
  email?: string | null | void;
  name?: string | null | void;
  team_id?: number | null | void;
}

/** 'AddUserToTeam' return type */
export interface IAddUserToTeamResult {
  team_id: number;
  user_id: number;
}

/** 'AddUserToTeam' query type */
export interface IAddUserToTeamQuery {
  params: IAddUserToTeamParams;
  result: IAddUserToTeamResult;
}

