import { json } from "@remix-run/node";

import { getAuthSession } from "~/utils/auth.server";
import { fetchSetTerms } from "~/endpoints/query/terms";
import { LevelLayout } from "~/components/levels";

import type { LoaderFunction } from "@remix-run/node";
import type { TermsLoaderData } from "~/types/data";

export const loader: LoaderFunction = async ({ request, params }) => {
  try {
    const authSession = await getAuthSession(request);
    const token = authSession.getToken();
    if (!token) {
      throw new Response("Unauthorized", { status: 401 });
    }

    const { setId } = params;
    if (typeof setId !== "string") return { error: "Set ID must be defined" };

    const url = new URL(request.url);
    const skip = url.searchParams.get("skip");
    const take = url.searchParams.get("take");
    const search = url.searchParams.get("search");

    const pageToken = 12;

    const fetchSetTermsResponse = await fetchSetTerms(
      {
        setId,
        skip: skip ? parseInt(skip) : 0,
        take: take ? parseInt(take) : pageToken,
        search,
      },
      token
    );

    const data: TermsLoaderData = {
      terms: fetchSetTermsResponse.data.setTerms.items,
      tatolItems: fetchSetTermsResponse.data.fetchSets.tatolItems,
      totalPages: fetchSetTermsResponse.data.fetchSets.totalPages,
      currentPage: fetchSetTermsResponse.data.fetchSets.currentPage,
      token,
      take: take ? parseInt(take) : pageToken,
      skip: skip ? parseInt(skip) : 0,
    };

    return json(data);
  } catch (error: any) {
    return json({ error: error.message }, { status: 400 });
  }
};

export const Levels = () => {
  return <LevelLayout />;
};
