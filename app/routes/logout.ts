import { redirect } from "@remix-run/node";

import { logout } from "~/endpoints/mutation/auth";
import { getAuthSession } from "~/utils/auth.server";

import type { ActionFunction } from "@remix-run/node";

export const action: ActionFunction = async ({ request }) => {
  const authSession = await getAuthSession(request);

  const token = authSession.getToken();

  await logout(token);

  return redirect("/login", {
    headers: {
      "Set-Cookie": await authSession.destroy(),
    },
  });
};

export const loader = () => {
  return redirect("/");
};
