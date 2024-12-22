import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { addUserToTeam, getUsers } from "../../api/users.js";
import { sample_users } from "../../api/sample_users.js";

export async function loader({ params }: LoaderFunctionArgs) {
  const teamId = Number(params.id);

  const users = await getUsers({ teamId });
  return { users };
}

export async function action({ params, request }: ActionFunctionArgs) {
  const teamId = Number(params.id);
  if (request.method !== "PUT") {
    throw new Response("Method Not Allowed", { status: 405 });
  }

  // TODO: implement proper user creation
  const randomEmail =
    sample_users[Math.floor(Math.random() * sample_users.length)];
  await addUserToTeam({
    teamId,
    // random from sample_users
    email: randomEmail,
    name: randomEmail,
  });
  return null;
}
