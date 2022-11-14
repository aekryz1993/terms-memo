import { json, redirect } from "@remix-run/node";

import type { AuthLoaderData, LoginActionData } from "~/types/data";

export const checkPathAuth = ({
  pathname,
  token,
  data,
}: {
  pathname: string;
  token?: string;
  data: AuthLoaderData;
}) => {
  if (pathname === "login" || pathname === "signup") {
    if (!token) return json(data);
  } else if (!token) return redirect("/login");
};

export const badRequest = (data: LoginActionData) =>
  json(data, { status: 400 });
