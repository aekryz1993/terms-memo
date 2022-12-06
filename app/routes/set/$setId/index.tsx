import { Outlet, useCatch } from "@remix-run/react";

export default function Set() {
  return <Outlet />;
}

export function CatchBoundary() {
  const caught = useCatch();
  console.log(caught);

  return <div>Huh... Couldn't find an client with the ID of:</div>;
}
