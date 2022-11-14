import { json, redirect } from "@remix-run/node";
import type { ActionFunction } from "@remix-run/node";

import { destroyAndRedirect, getAuthSession } from "~/utils/auth.server";
import { checkToken } from "~/endpoints/mutation/auth";

import type { LoaderFunction } from "@remix-run/node";

export const action: ActionFunction = async ({ request }) => {
  const authSession = await getAuthSession(request);
  const requestText = await request.text();
  const form = new URLSearchParams(requestText);
  const token = form.get("token");

  if (!token) return await destroyAndRedirect(authSession.destroy);

  try {
    const response = await checkToken(token);
    if (response.data.checkToken.token) {
      // debug
      console.log("sync: ", response.data.checkToken.token);
      authSession.setToken(response.data.checkToken.token);
      return json(
        { authInfo: response.data.checkToken, actionType: "sync" },
        {
          headers: {
            "Set-Cookie": await authSession.commit(
              new Date(response.data.checkToken.expiresIn)
            ),
          },
        }
      );
    }
    return await destroyAndRedirect(authSession.destroy);
  } catch (error: any) {
    return await destroyAndRedirect(authSession.destroy);
  }
};

export const loader: LoaderFunction = () => redirect("/", { status: 404 });
