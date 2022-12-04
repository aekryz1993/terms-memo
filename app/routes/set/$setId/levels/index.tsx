import { json } from "@remix-run/node";
import { useCatch } from "@remix-run/react";

import { getAuthSession } from "~/utils/auth.server";
import { fetchSetTerms } from "~/endpoints/query/terms";
import { TermsLayout } from "~/components/terms";

import type { LoaderFunction } from "@remix-run/node";
import type { TermsLoaderData } from "~/types/data";

export const loader: LoaderFunction = async ({ request, params }) => {
  try {
    const authSession = await getAuthSession(request);
    const token = authSession.getToken();
    if (!token) {
      throw new Response("Unauthorized", { status: 401 });
    }

    const url = new URL(request.url);
    const skip = url.searchParams.get("skip");
    const take = url.searchParams.get("take");
    const search = url.searchParams.get("search");

    const pageToken = 12;

    const { setId } = params;

    if (typeof setId !== "string") return { error: "Set ID must be defined" };

    const fetchSetTermsResponse = await fetchSetTerms(
      {
        setId,
        skip: skip ? parseInt(skip) : 0,
        take: take ? parseInt(take) : pageToken,
        search,
      },
      token
    );

    const { items, ...paginationData } = fetchSetTermsResponse.data.setTerms;

    const data: TermsLoaderData = {
      terms: items,
      ...paginationData,
      take: take ? parseInt(take) : pageToken,
      skip: skip ? parseInt(skip) : 0,
    };

    return json(data);
  } catch (error: any) {
    throw new Response(error.message, { status: 500 });
  }
};

export default function Levels() {
  return <TermsLayout />;
}

export function CatchBoundary() {
  const caught = useCatch();
  console.log(caught);

  return <div>Huh... Couldn't find an client with the ID of:</div>;
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  return <div>Uh oh. I did a whoopsies</div>;
}
