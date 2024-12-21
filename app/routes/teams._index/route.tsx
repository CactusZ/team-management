import { Form, Link, useLoaderData } from "@remix-run/react";
import { createTeam, fetchAllTeams } from "../../api/teams.js";
import { ActionFunctionArgs } from "@remix-run/node";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
export async function loader() {
  const teams = await fetchAllTeams();
  return {
    teams,
  };
}

export default function Teams() {
  const teamsData = useLoaderData<typeof loader>();
  return (
    <div className="max-h-full flex flex-col">
      <div className="w-full border-b-2 pb-4 p-16">
        <h1 className="text-2xl font-bold">Teams</h1>
        <Form method="put" action="/teams">
          <button className="p-2 mt-2 bg-sky-500 text-sky-950 rounded hover:bg-sky-700 text-slate-100">
            {" "}
            Add Team{" "}
          </button>
        </Form>
      </div>
      <div className="p-8 flex-1 overflow-y-auto">
        {teamsData.teams.map((team) => (
          <div
            key={team.id}
            className="flex p-1 h-16 rounded border-2 m-2 flex items-center pl-4 cursor-pointer hover:bg-sky-700 hover:text-slate-100"
          >
            <div>{team.name}</div>
            <div className="ml-auto pr-8">
              <Link to={`/teams/${team.id}`}>
                <PencilSquareIcon className="size-6 text-blue-300 hover:text-slate-100" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  switch (request.method) {
    case "put":
      return await createTeam();
    case "get":
  }

  return null;
}
