import { json } from "@remix-run/node";

import { getAuthSession } from "~/utils/auth.server";
import { deleteTerm } from "~/endpoints/mutation/term";

import type { ActionFunction } from "@remix-run/node";
import type { TermActionData } from "~/types/data";

export const badRequest = (data: TermActionData) => json(data, { status: 400 });

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
      formError: `Form not submitted correctly. (ID) must be provided`,
    });
  }

  try {
    const response = await deleteTerm({ id }, token);
    return json({ ...response.data.deleteTerm, actionType: "delete-term" });
  } catch (error: any) {
    return badRequest({
      formError: error.message,
    });
  }
};
