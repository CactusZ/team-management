import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import {
  getChildTeams,
  getParentTeamCandidates,
  getPathToTeam,
  getTeam,
  updateTeamName,
  updateTeamParent,
} from "../../api/teams.js";
import { Link, useFetcher, useLoaderData } from "@remix-run/react";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid";
import React, { useCallback } from "react";
import _ from "lodash";
import { FormField } from "./FormField.js";
import { assertIdIsValid } from "./utils.js";
import { TeamList } from "../../components/TeamList/TeamList.js";
import { UsersList } from "../../components/UsersList/UsersList.js";
import { getUsers } from "../../api/users.js";

export async function loader({ params }: LoaderFunctionArgs) {
  try {
    const id = Number(params.id);
    assertIdIsValid(id);
    const [team, parentTeamCandidates, childTeams, users, pathToTeam] =
      await Promise.all([
        getTeam({ id }),
        getParentTeamCandidates({ teamId: id }),
        getChildTeams({ teamId: id }),
        getUsers({ teamId: id }),
        getPathToTeam({ id }),
      ]);

    if (!team) {
      throw new Response("Team not found", { status: 404 });
    }
    return {
      team,
      parentTeamCandidates,
      childTeams,
      users,
      pathToTeam,
    };
  } catch (e) {
    console.error("Error loading team: ", e);
    throw new Response("Error loading team", { status: 500 });
  }
}

export default function TeamView() {
  const { team, parentTeamCandidates, childTeams, users, pathToTeam } =
    useLoaderData<typeof loader>();

  const fetcher = useFetcher();

  const updateTeamName = useCallback(
    _.debounce((newName: string) => {
      if (!newName) {
        return;
      }
      fetcher.submit(
        { name: newName },
        {
          method: "patch",
          action: `/teams/${team.id}`,
        },
      );
    }, 100),
    [fetcher],
  );

  const updateTeamParent = useCallback<
    React.ChangeEventHandler<HTMLSelectElement>
  >((e) => {
    const newParent = Number(e.target.value);
    if (newParent === team.id) {
      return;
    }
    fetcher.submit(
      { newParent },
      {
        method: "patch",
        action: `/teams/${team.id}`,
      },
    );
  }, []);

  return (
    <div className="max-h-full flex flex-col">
      <div className="flex w-full border-b-2 h-16 pl-4 relative items-center space-x-4">
        <Link to="/teams">
          <ArrowUturnLeftIcon className="h-6 w-6 cursor-pointer text-sky-950 hover:text-sky-400" />
        </Link>
        <h1 className="text-2xl font-bold">{team.name}</h1>
      </div>
      <div className="p-4">
        <>
          {pathToTeam.slice(2).map((team) => (
            <span key={team.id}>{team.name} / </span>
          ))}
        </>
        <select
          name="parent-team"
          onChange={updateTeamParent}
          value={team.parent_id || 0}
          className="border p-1 pl-4 w-fit rounded-lg text-right"
        >
          <option value="0">No parent team</option>
          {parentTeamCandidates.map((team) => (
            <option key={team.id} value={team.id}>
              {team.name}
            </option>
          ))}
        </select>{" "}
        / <span>{team.name}</span>
      </div>
      <div className="pt-4 pb-4 border-b-2">
        <FormField label="Id" value={team.id.toString()} disabled />
        <FormField label="Name" value={team.name} onChange={updateTeamName} />
      </div>
      <div className="border-b-2">
        <UsersList users={users} showAddUser />
      </div>
      <div>
        <h1 className="text-2xl font-bold p-4">Sub-teams</h1>
        <TeamList teams={childTeams} />
      </div>
    </div>
  );
}

export async function action({ request, params }: ActionFunctionArgs) {
  const id = Number(params.id);
  assertIdIsValid(id);
  switch (request.method) {
    case "PATCH":
      return actionUpdateTeam(id, request);
    default:
      throw new Response("Method not allowed", { status: 405 });
  }
}

async function actionUpdateTeam(id: number, request: Request) {
  const formData = await request.formData();
  const name = formData.get("name") as string;
  const newParent = formData.has("newParent")
    ? Number(formData.get("newParent")) || null
    : undefined;

  let success = false;

  if (name) {
    success = await updateTeamName({ id, name });
  }

  if (newParent !== undefined) {
    success = await updateTeamParent({ id, newParent });
  }

  if (!success) {
    throw new Response("Failed to update team", { status: 500 });
  } else {
    return null;
  }
}
