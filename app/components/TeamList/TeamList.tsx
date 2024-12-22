import React, { FC } from "react";
import { Team } from "../../api/teams.js";
import { TeamListItem } from "./TeamListItem.js";

export const TeamList: FC<{ teams: Team[] }> = ({ teams }) => {
  return (
    <>
      {teams.map((team) => (
        <TeamListItem key={team.id} team={team} />
      ))}
    </>
  );
};

TeamList.displayName = "TeamList";
