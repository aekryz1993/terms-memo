import { json } from "@remix-run/node";

import { getAuthSession } from "~/utils/auth.server";

import type { ActionFunction } from "@remix-run/node";
import type { SetActionData } from "~/types/data";
import { deleteSet } from "~/endpoints/mutation/set";

export const badRequest = (data: SetActionData) => json(data, { status: 400 });

export const action: ActionFunction = async ({ request }) => {
  const authSession = await getAuthSession(request);
  const token = authSession.getToken();
  if (!token) {
    throw new Response("Unauthorized", { status: 401 });
  }

  const requestText = await request.text();
  const form = new URLSearchParams(requestText);
  const id = form.get("id");

  if (typeof id !== "string") {
    return badRequest({
      formError: `Form not submitted correctly.`,
    });
  }

  try {
    const response = await deleteSet({ id }, token);
    return json({ ...response.data.deleteSet, actionType: "delete-set" });
  } catch (error: any) {
    return badRequest({
      formError: error.message,
    });
  }
};
