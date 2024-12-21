import { FC, useCallback, useState } from "react";
import { Team } from "../../api/teams.js";
import { Link, useFetcher } from "@remix-run/react";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/solid";
import { TeamList } from "./TeamList.js";
import { loader } from "../../routes/teams.$id.hierarchy/route.js";

export const TeamListItem: FC<{ team: Team }> = ({ team }) => {
  const fetcher = useFetcher<typeof loader>();
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = useCallback(async () => {
    const shouldExpand = !isExpanded;
    if (shouldExpand) {
      fetcher.load(`/teams/${team.id}/hierarchy`);
    }
    setIsExpanded(shouldExpand);
  }, [isExpanded]);

  return (
    <>
      <div
        key={team.id}
        className="flex p-1 h-16 rounded border-2 m-2 flex items-center pl-4 cursor-pointer hover:bg-sky-700 hover:text-slate-100"
        onClick={toggleExpanded}
      >
        {isExpanded ? (
          <ChevronDownIcon className="size-4" />
        ) : (
          <ChevronRightIcon className="size-4" />
        )}
        <div className="pl-4">{team.name}</div>
        <div className="ml-auto pr-8">
          <Link to={`/teams/${team.id}`}>
            <PencilSquareIcon className="size-6 text-blue-300 hover:text-slate-100" />
          </Link>
        </div>
      </div>
      {isExpanded && !!fetcher.data && (
        <div className="pl-16 flex-col">
          <TeamList teams={fetcher.data.childTeams} />
        </div>
      )}
    </>
  );
};

TeamListItem.displayName = "TeamListItem";
