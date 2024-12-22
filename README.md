# team-management

## Setup

Tested on Node 22 and npm 10

1. `npm i`
2. `npm run init` (will create .env from .env.example)
3. `docker compose up -d` (to launch postgres, adminer and dev container)
    - postgres username/password is postgres/example
    - adminer available on port 8080
4. either locally `npm run dev` or attach to dev container and run `npm i && npm run dev` inside
    - you can attach via VSCode Dev Container functionality or `docker compose exec dev zsh`
    - local app available by default on `localhost:3000`
    - launched in docker app available by default on `localhost:3100`
5. for active development, run `npm run pg-typed` to run pgtyped in watch mode 

## Implemented functionality

1. Teams Home view where you can see teams, their users and child teams - whole hierarchy
2. Team edit screen - view hierarchy path, edit name and parent, add users
3. Right now, when clicking "Add user" Icon, one of the 10 pre-defined emails is selected. I didn't have time to finish this part properly. Sometimes, clicking Add User does nothing because randomly existing team member is selected.

## Technical decisions

### Technology stack

1. Remix as SSR framework. I didn't have much production experience with SSRs, I went with Remix as it was recommended in task description.
2. pg + pg-typed. They seemed straightforward enough, I liked pg-typed watch mode. Good integration with Typescript. Also, pg-typed out of the box protects from sql injection.
3. Tailwind + Heroicons - quick way to make a layout, responsive
4. Setup with Docker - allows to use project's postgres, ensures consistency between different envs
   - I tried to streamline the startup process as much as possible
5. ESLint + Prettier to maintain code style
6. tsx + dotenvx for better dev mode

### File structure

1. `db` folder handles connection to Postgres + db schema + indexes, `runQuery` is a convenient bottle-neck for PostgreSQL queries where additional loggin, metrics, alerting could be added
2. `api` folder is for queries. Several layers - 
    - `[name].queries.ts` - pg-typed sql queries
    - `teams.ts` or `users.ts` has API methods to be used in Remix loaders/actions, wrappers with potential business logic
3. `routes` with Remix components
4. `components` for React components shared between routes

### Database

1. Users and teams have their tables. 
   - User's email marked as UNIQUE because user management is quite often done via emails 
2. A separate table `team_users` to store connection between users and teams
    - allows to quickly find team's members and user's teams
3. Potentially, we may want to limit the depth of hirerachy, left as is for this task. I believe performance degradation may be possible due to heavy recursion.
4. Store relations between teams in `parent_id` field on a team in teams table. Usually, hierarchy = recursion, so it makes sense to treat team as a leaf node in a tree. This approach seemed simple enough for this task and it could be adjusted pretty easily in the future.
5. Add indexes to cover existing queries.
6. I added CASCADE to make it easy to remove teams and users. However, we may want to turn to is_deleted marker if we want to make this revertable.

### Other

1. I did not implement pagination to save time.
2. I deliberately avoided writing tests to prioritize speed here
3. UI done through the eyes of a person without Design taste, sorry :D

## TODOs

1. Error boundary to properly handle errors on UI
2. Better loading states
3. Delete team/user
4. Tests
5. Pre-commit hooks

## Production considerations

1. Pagination
2. Authentication
3. Logging + monitoring
4. API Rate limiting
5. Production build