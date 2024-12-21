import { FC } from "react";
import { Team } from "../../api/teams.js";
import { Link } from "@remix-run/react";
import { PencilSquareIcon } from "@heroicons/react/24/solid";

export const TeamListItem: FC<{ team: Team }> = ({ team }) => {
  return (
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
  );
};

TeamListItem.displayName = "TeamListItem";
