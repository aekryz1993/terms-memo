import { redirect } from "@remix-run/node";

import { logout } from "~/endpoints/mutation/auth";
import { getAuthSession } from "~/utils/auth.server";

import type { ActionFunction } from "@remix-run/node";

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const isController = form.get("isController");

  if (isController) {
    const authSession = await getAuthSession(request);

    const token = authSession.getToken();

    await logout(token);

    return redirect("/login", {
      headers: {
        "Set-Cookie": await authSession.destroy(),
      },
    });
  }

  return redirect("/login");
};
