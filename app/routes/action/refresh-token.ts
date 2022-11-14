import { json, redirect } from "@remix-run/node";
import type { ActionFunction } from "@remix-run/node";

import { destroyAndRedirect, getAuthSession } from "~/utils/auth.server";
import { refreshToken } from "~/endpoints/mutation/auth";

import type { LoaderFunction } from "@remix-run/node";

export const action: ActionFunction = async ({ request }) => {
  const authSession = await getAuthSession(request);
  const requestText = await request.text();
  const form = new URLSearchParams(requestText);
  const token = form.get("token");

  if (!token) return await destroyAndRedirect(authSession.destroy);

  try {
    const response = await refreshToken(token);
    if (response.data.refreshToken.token) {
      // debug
      console.log("refresh: ", response.data.refreshToken.token);
      authSession.setToken(response.data.refreshToken.token);
      return json(
        { authInfo: response.data.refreshToken, actionType: "refresh" },
        {
          headers: {
            "Set-Cookie": await authSession.commit(
              new Date(response.data.refreshToken.expiresIn)
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
