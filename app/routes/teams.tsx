import { useLoaderData } from "@remix-run/react";
import { fetchAllTeams } from "../api/teams.js";

export async function loader() {
  const teams = await fetchAllTeams();
  return {
    teams,
  };
}

export default function Teams() {
  const teamsData = useLoaderData<typeof loader>();
  return (
    <div className="p-16">
      {teamsData.teams.map((team) => (
        <div key={team.id} className="">
          {team.name}
        </div>
      ))}
    </div>
  );
}
