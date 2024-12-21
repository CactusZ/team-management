import { LoaderFunctionArgs } from "@remix-run/node";
import { getTeam, updateTeam, type TeamForm } from "../../api/teams.js";
import { Link, useFetcher, useLoaderData } from "@remix-run/react";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid";
import React, { useCallback } from "react";
import _ from "lodash";
import { FormField } from "./FormField.js";

export async function loader({ params }: LoaderFunctionArgs) {
  try {
    const id = Number(params.id);
    if (isNaN(id) || id < 1 || !id) {
      throw new Response("Invalid team ID", { status: 400 });
    }
    const team = await getTeam({ id });
    if (!team) {
      throw new Response("Team not found", { status: 404 });
    }
    return team;
  } catch (e) {
    console.error("Error loading team: ", e);
    throw new Response("Error loading team", { status: 500 });
  }
}

export default function TeamView() {
  const team = useLoaderData<typeof loader>();
  const fetcher = useFetcher();

  const updateTeamName = useCallback(
    _.debounce((newName: string) => {
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

  return (
    <div className="max-h-full flex flex-col">
      <div className="flex w-full border-b-2 h-16 pl-4 relative items-center space-x-4">
        <Link to="/teams">
          <ArrowUturnLeftIcon className="h-6 w-6 cursor-pointer text-sky-950 hover:text-sky-400" />
        </Link>
        <h1 className="text-2xl font-bold">{team.name}</h1>
      </div>
      <div>
        <FormField label="Id" value={team.id.toString()} disabled />
        <FormField label="Name" value={team.name} onChange={updateTeamName} />
      </div>
    </div>
  );
}

export async function action({ request, params }: LoaderFunctionArgs) {
  const id = Number(params.id);
  if (isNaN(id) || id < 1 || !id) {
    throw new Response("Invalid team ID", { status: 400 });
  }
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
  if (!name) {
    return new Response("Missing team name", { status: 400 });
  }
  const success = await updateTeam({ id, name });
  if (!success) {
    throw new Response("Failed to update team", { status: 500 });
  } else {
    return null;
  }
}
