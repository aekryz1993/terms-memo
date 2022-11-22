import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { SetsLayout } from "~/components/sets";
import { fetchSets } from "~/endpoints/query/sets";
import { getAuthSession } from "~/utils/auth.server";
import { SetProvider } from "~/context/set/provider";

import type { LoaderFunction } from "@remix-run/node";
import type { SetsLoaderData } from "~/types/data";

export const loader: LoaderFunction = async ({ request }) => {
  try {
    const authSession = await getAuthSession(request);

    const token = authSession.getToken();

    const fetchSetsResponse = await fetchSets({ skip: 0, take: 15 }, token);

    const data: SetsLoaderData = {
      sets: fetchSetsResponse.data.fetchSets.sets,
      tatolSets: fetchSetsResponse.data.fetchSets.tatolSets,
      totalPages: fetchSetsResponse.data.fetchSets.totalPages,
      currentPage: fetchSetsResponse.data.fetchSets.currentPage,
      token,
    };
    return json(data);
  } catch (error: any) {
    console.error(error);
    return { error: error.message };
  }
};

export default function Index() {
  const { sets, currentPage } = useLoaderData();

  return (
    <SetProvider sets={sets} currentPage={currentPage}>
      <SetsLayout />
    </SetProvider>
  );
}
