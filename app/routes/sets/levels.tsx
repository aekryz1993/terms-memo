import { json } from "@remix-run/node";
import { getAuthSession } from "~/utils/auth.server";

import type { LoaderFunction } from "@remix-run/node";
import { fetchSetLevels } from "~/endpoints/query/levels";

export const loader: LoaderFunction = async ({ request, params }) => {
  const authSession = await getAuthSession(request);
  const token = authSession.getToken();
  if (!token) {
    throw new Response("Unauthorized", { status: 401 });
  }

  const { setId } = params;

  if (typeof setId !== "string") return { error: "Set ID must be defined" };

  const fetchSetLevelsResponse = await fetchSetLevels({ setId }, token);

  const data = {
    levels: fetchSetLevelsResponse.data.setLevels.levels,
  };

  return json(data);
};

export const Levels = () => {
  return;
};
