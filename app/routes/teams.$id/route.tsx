import { LoaderFunctionArgs } from "@remix-run/node";
import {
  getParentTeamCandidates,
  getTeam,
  updateTeamName,
  updateTeamParent,
} from "../../api/teams.js";
import { Link, useFetcher, useLoaderData } from "@remix-run/react";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid";
import React, { useCallback } from "react";
import _ from "lodash";
import { FormField } from "./FormField.js";

export async function loader({ params }: LoaderFunctionArgs) {
  try {
    const id = Number(params.id);
    assertIdIsValid(id);
    const [team, parentTeamCandidates] = await Promise.all([
      getTeam({ id }),
      getParentTeamCandidates({ teamId: id }),
    ]);

    if (!team) {
      throw new Response("Team not found", { status: 404 });
    }
    return {
      team,
      parentTeamCandidates,
    };
  } catch (e) {
    console.error("Error loading team: ", e);
    throw new Response("Error loading team", { status: 500 });
  }
}

function assertIdIsValid(id: number) {
  if (isNaN(id) || id < 1 || !id) {
    throw new Response("Invalid team ID", { status: 400 });
  }
}

export default function TeamView() {
  const { team, parentTeamCandidates } = useLoaderData<typeof loader>();

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
        <select name="parent-team" onChange={updateTeamParent}>
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
      <div>
        <h1 className="text-2xl font-bold p-4">Sub-teams</h1>
      </div>
    </div>
  );
}

export async function action({ request, params }: LoaderFunctionArgs) {
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
  const newParent = Number(formData.get("newParent"));

  let success = false;

  if (name) {
    success = await updateTeamName({ id, name });
  }

  if (newParent) {
    success = await updateTeamParent({ id, newParent });
  }

  if (!success) {
    throw new Response("Failed to update team", { status: 500 });
  } else {
    return null;
  }
}
