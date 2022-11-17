import { json, redirect } from "@remix-run/node";
import type { ActionFunction } from "@remix-run/node";

export const action: ActionFunction = async ({ request }) => {
  const requestText = await request.text();
  const form = new URLSearchParams(requestText);
  const from = form.get("from");

  if (!from) {
    return json({
      success: false,
      message: `theme value of ${from} is not a valid from`,
    });
  }

  return redirect(`${from}`);
};
