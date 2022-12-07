import { Outlet, useCatch } from "@remix-run/react";

import { ErrorMessageField } from "~/components/utilities/inputs";

export default function Set() {
  return <Outlet />;
}

export function CatchBoundary() {
  const caught = useCatch();

  return <ErrorMessageField>{caught.statusText}</ErrorMessageField>;
}
