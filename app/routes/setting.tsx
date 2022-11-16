import { json } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";

import type { SetsLoaderData } from "~/types/data";
import { fetchSets } from "~/endpoints/query/sets";
import { getAuthSession } from "~/utils/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  const authSession = await getAuthSession(request);

  const token = authSession.getToken();

  const fetchSetsResponse = await fetchSets({ skip: 0, take: 20 }, token);

  const data: SetsLoaderData = {
    sets: fetchSetsResponse.data.sets,
  };
  return json(data);
};

export default function Setting() {
  return <div>Setting</div>;
}
