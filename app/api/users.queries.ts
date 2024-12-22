import { sql } from "@pgtyped/runtime";
import {
  IAddUserToTeamQuery,
  IGetUsersFromTeamQuery,
} from "./users.queries.types.js";

const getUsersFromTeam = sql<IGetUsersFromTeamQuery>`
SELECT u.id, u.email, u.name 
FROM users AS u
JOIN team_users AS team_user
ON u.id = team_user.user_id 
WHERE team_user.team_id = $team_id 
ORDER BY u.email`;

const addUserToTeam = sql<IAddUserToTeamQuery>`
    WITH new_user AS (
        INSERT INTO users (email, name) 
        VALUES ($email, $name) 
        ON CONFLICT (email) 
        DO UPDATE SET email = EXCLUDED.email 
        RETURNING id
    )
    INSERT INTO team_users (team_id, user_id) 
    SELECT $team_id, id FROM new_user 
    ON CONFLICT (team_id, user_id) DO NOTHING
    RETURNING *;
`;

export const usersQueries = {
  getUsersFromTeam,
  addUserToTeam,
};
