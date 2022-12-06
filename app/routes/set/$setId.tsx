import { json, redirect } from "@remix-run/node";
import { useCatch } from "@remix-run/react";

import { fetchSet } from "~/endpoints/query/sets";
import { getAuthSession } from "~/utils/auth.server";
import { SetLayout } from "~/components/set";
import { fetchSetLevels } from "~/endpoints/query/levels";
import { createTerm } from "~/endpoints/mutation/term";
import { validateTitle } from "~/utils/helpers";

import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import type {
  TermActionData,
  LevelsLoaderData,
  SetLoaderData,
} from "~/types/data";

export const loader: LoaderFunction = async ({ request, params }) => {
  const authSession = await getAuthSession(request);
  const token = authSession.getToken();
  if (!token) {
    throw new Response("Unauthorized", { status: 401 });
  }

  const { setId } = params;

  if (typeof setId !== "string") return { error: "Set ID must be provided" };

  const fetchSetResponse = await fetchSet({ id: setId }, token);
  const fetchSetLevelsResponse = await fetchSetLevels({ setId }, token);

  const data: SetLoaderData & LevelsLoaderData = {
    set: fetchSetResponse.data.fetchSet.set,
    levels: fetchSetLevelsResponse.data.setLevels.levels,
  };

  return json(data);
};

export const badRequest = (data: TermActionData) => json(data, { status: 400 });

export const action: ActionFunction = async ({ request, params }) => {
  const authSession = await getAuthSession(request);
  const token = authSession.getToken();
  if (!token) {
    throw new Response("Unauthorized", { status: 401 });
  }

  const { setId } = params;

  const form = await request.formData();
  const levelId = form.get("levelId");
  const name = form.get("name");
  const definition = form.get("definition");
  const actionType = form.get("actionType");

  if (
    typeof name !== "string" ||
    typeof definition !== "string" ||
    typeof actionType !== "string"
  ) {
    return badRequest({
      formError: `Form not submitted correctly.`,
    });
  }

  const fields = { name };
  const fieldErrors = {
    name: validateTitle(name),
  };

  if (Object.values(fieldErrors).some(Boolean))
    return badRequest({ fieldErrors, fields });

  try {
    switch (actionType) {
      case "add": {
        if (typeof levelId !== "string") {
          return badRequest({
            formError: `Form not submitted correctly. (levelId) must be provided`,
          });
        }
        await createTerm({ levelId, name, definition }, token);
        return redirect(`/set/${setId}/levels/${levelId}`);
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

export default function Set() {
  return <SetLayout />;
}

export function CatchBoundary() {
  const caught = useCatch();
  console.log(caught);

  return <div>Huh... Couldn't find an client with the ID of:</div>;
}
