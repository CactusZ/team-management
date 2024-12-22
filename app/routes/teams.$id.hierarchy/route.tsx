import { LoaderFunctionArgs } from "@remix-run/node";
import { assertIdIsValid } from "../teams.$id/utils.js";
import { getChildTeams } from "../../api/teams.js";

export async function loader({ params }: LoaderFunctionArgs) {
  const id = Number(params.id);
  assertIdIsValid(id);

  const childTeams = (await getChildTeams({ parentId: id })) || [];

  return {
    childTeams,
  };
}
