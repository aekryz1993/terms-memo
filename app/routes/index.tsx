import { ActionFunction, json } from "@remix-run/node";

import { fetchSets } from "~/endpoints/query/sets";
import { getAuthSession } from "~/utils/auth.server";
import { SetLayout } from "~/components/sets";

import type { LoaderFunction } from "@remix-run/node";
import type { SetsLoaderData } from "~/types/data";

export const loader: LoaderFunction = async ({ request }) => {
  try {
    const authSession = await getAuthSession(request);
    const url = new URL(request.url);
    const skip = url.searchParams.get("skip");
    const take = url.searchParams.get("take");
    const search = url.searchParams.get("search");

    const token = authSession.getToken();

    const pageToken = 12;

    const fetchSetsResponse = await fetchSets(
      {
        skip: skip ? parseInt(skip) : 0,
        take: take ? parseInt(take) : pageToken,
        search,
      },
      token
    );

    const data: SetsLoaderData = {
      sets: fetchSetsResponse.data.fetchSets.sets,
      tatolSets: fetchSetsResponse.data.fetchSets.tatolSets,
      totalPages: fetchSetsResponse.data.fetchSets.totalPages,
      currentPage: fetchSetsResponse.data.fetchSets.currentPage,
      token,
      take: take ? parseInt(take) : pageToken,
      skip: skip ? parseInt(skip) : 0,
    };
    return json(data);
  } catch (error: any) {
    console.error(error);
    return { error: error.message };
  }
};

export default function Index() {
  return <SetLayout />;
}
