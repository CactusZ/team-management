import { Links, Meta, Outlet, Scripts } from "@remix-run/react";
import stylesheet from "./tailwind.css?url";
import { LinksFunction } from "@remix-run/node";
import { FC, PropsWithChildren } from "react";

export default function App() {
  return (
    <html>
      <head>
        <link rel="icon" href="data:image/x-icon;base64,AA" />
        <Meta />
        <Links />
      </head>
      <body>
        <div className="flex">
          <div className="w-1/5 h-screen bg-sky-500 min-w-max">
            <div className="flex flex-col justify-center text-center border-b-2 bg-sky-800">
              <h1 className="p-4 text-2xl text-blue-100 select-none">
                Team management app
              </h1>
            </div>

            <nav>
              <ul>
                <SidebarLink href="/teams">Teams</SidebarLink>
              </ul>
              <ul>
                <SidebarLink href="/users">Users</SidebarLink>
              </ul>
            </nav>
          </div>
          <div className="flex-1">
            <Outlet />
          </div>
        </div>

        <Scripts />
      </body>
    </html>
  );
}

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

const SidebarLink: FC<PropsWithChildren<{ href: string }>> = ({
  href,
  children,
}) => {
  return (
    <li className="flex flex-col justify-center w-full h-12 text-lg font-bold text-center transition duration-150 rounded cursor-pointer text-sky-950 hover:text-slate-100 hover:bg-sky-700 hover:ease-in">
      <a href={href}>{children}</a>
    </li>
  );
};
SidebarLink.displayName = "SidebarLink";
