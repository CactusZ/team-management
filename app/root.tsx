import { Links, Meta, Outlet, Scripts } from "@remix-run/react";
import stylesheet from "./tailwind.css?url";
import { LinksFunction } from "@remix-run/node";

export default function App() {
  return (
    <html>
      <head>
        <link rel="icon" href="data:image/x-icon;base64,AA" />
        <Meta />
        <Links />
      </head>
      <body>
        <h1>Hello world!</h1>
        <Outlet />

        <Scripts />
      </body>
    </html>
  );
}

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];
