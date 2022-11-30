import { json } from "@remix-run/node";

import { fetchSet } from "~/endpoints/query/sets";
import { getAuthSession } from "~/utils/auth.server";
import { fetchSetLevels } from "~/endpoints/query/levels";
import { SetLayout } from "~/components/set";

import type { LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = async ({ request, params }) => {
  const authSession = await getAuthSession(request);
  const token = authSession.getToken();
  if (!token) {
    throw new Response("Unauthorized", { status: 401 });
  }

  const { setId } = params;

  if (typeof setId !== "string") return { error: "Set ID must be defined" };

  const fetchSetResponse = await fetchSet({ id: setId }, token);

  const fetchSetLevelsResponse = await fetchSetLevels({ setId }, token);

  const data = {
    set: fetchSetResponse.data.fetchSet.set,
    levels: fetchSetLevelsResponse.data.setLevels.levels,
  };

  return json(data);
};

export default function Set() {
  return <SetLayout />;
}
