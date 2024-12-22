import { Form, useLoaderData } from "@remix-run/react";
import { createTeam, getTeams } from "../../api/teams.js";
import { ActionFunctionArgs } from "@remix-run/node";
import { TeamList } from "../../components/TeamList/TeamList.js";
export async function loader() {
  const teams = await getTeams();
  return {
    teams,
  };
}

export default function Teams() {
  const teamsData = useLoaderData<typeof loader>();
  return (
    <div className="max-h-full flex flex-col">
      <div className="flex justify-between items-center w-full border-b-2 pb-4 p-16">
        <h1 className="text-2xl font-bold">Teams</h1>
        <Form method="put" action="/teams">
          <button
            name="addTeam"
            className="p-2 bg-sky-500 text-sky-950 rounded hover:bg-sky-700 text-slate-100"
          >
            Add Team
          </button>
        </Form>
      </div>
      <div className="p-8 flex-1 overflow-y-auto">
        <TeamList teams={teamsData.teams} />
      </div>
    </div>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  switch (request.method) {
    case "PUT":
      return await createTeam();
    case "GET":
  }

  return null;
}
