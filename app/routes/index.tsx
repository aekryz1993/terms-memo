import { ActionFunction, json, redirect } from "@remix-run/node";

import { fetchSets } from "~/endpoints/query/sets";
import { getAuthSession } from "~/utils/auth.server";
import { SetLayout } from "~/components/sets";

import type { LoaderFunction } from "@remix-run/node";
import type { SetActionData, SetsLoaderData } from "~/types/data";
import { validateTitle } from "~/utils/helpers";
import { createSet, editSet } from "~/endpoints/mutation/set";

export const loader: LoaderFunction = async ({ request }) => {
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
    return json({ error: error.message }, { status: 400 });
  }
};

export const badRequest = (data: SetActionData) => json(data, { status: 400 });

export const action: ActionFunction = async ({ request }) => {
  const authSession = await getAuthSession(request);
  const token = authSession.getToken();
  if (!token) {
    throw new Response("Unauthorized", { status: 401 });
  }

  const form = await request.formData();
  const id = form.get("id");
  const title = form.get("title");
  const description = form.get("description");
  const actionType = form.get("actionType");

  if (
    typeof title !== "string" ||
    typeof description !== "string" ||
    typeof actionType !== "string"
  ) {
    return badRequest({
      formError: `Form not submitted correctly.`,
    });
  }

  const fields = { title };
  const fieldErrors = {
    title: validateTitle(title),
  };

  if (Object.values(fieldErrors).some(Boolean))
    return badRequest({ fieldErrors, fields });

  try {
    switch (actionType) {
      case "add": {
        await createSet({ title, description }, token);
        return redirect(".");
      }
      case "edit": {
        if (typeof id !== "string") {
          return badRequest({
            formError: `Form not submitted correctly.`,
          });
        }
        await editSet({ id, title, description }, token);
        return redirect(".");
      }
      default: {
        return badRequest({
          fields,
          formError: `Action type invalid`,
        });
      }
    }
  } catch (error: any) {
    return badRequest({
      formError: error.message,
    });
  }
};

export default function Index() {
  return <SetLayout />;
}
