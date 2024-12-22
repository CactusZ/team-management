import { UserCircleIcon } from "@heroicons/react/16/solid";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { Form } from "@remix-run/react";
import { FC, useCallback, useState } from "react";
import { User } from "../../api/users.js";

export const UsersList: FC<{
  users: User[];
  showAddUser?: boolean;
}> = ({ users, showAddUser }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpanded = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, [isExpanded]);

  return (
    <div>
      <div className="flex items-center justify-between pr-12">
        <h1
          className="text-2xl font-bold p-4 cursor-pointer"
          onClick={toggleExpanded}
        >
          Users
        </h1>
        {showAddUser && (
          <Form method="put" name="addUser" action="./users" navigate={false}>
            <button>
              <PlusCircleIcon className="h-6 w-6 cursor-pointer text-sky-950 hover:text-sky-400" />
            </button>
          </Form>
        )}
      </div>
      {isExpanded && (
        <div className="pl-8 pb-8">
          <ul>
            {users.map((user) => (
              <li key={user.id} className="flex items-center">
                <UserCircleIcon className="size-6" />
                <div className="pl-4">{user.name}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
