import { json, redirect } from "@remix-run/node";
import { useCatch } from "@remix-run/react";

import { validatePassword, validateUsername } from "~/utils/helpers";
import { AuthLayout } from "~/components/auth";
import { login, signup } from "~/endpoints/mutation/auth";
import { setupToken } from "~/utils/auth.server";

import type { LoginActionData } from "~/types/data";
import type { ActionFunction } from "@remix-run/node";

export const badRequest = (data: LoginActionData) =>
  json(data, { status: 400 });

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const username = form.get("username");
  const password = form.get("password");
  const authType = form.get("authType");

  if (
    typeof username !== "string" ||
    typeof password !== "string" ||
    typeof authType !== "string"
  ) {
    return badRequest({
      formError: `Form not submitted correctly.`,
    });
  }

  const fields = { username, password };
  const fieldErrors = {
    username: validateUsername(username),
    password: validatePassword(password),
  };

  if (Object.values(fieldErrors).some(Boolean))
    return badRequest({ fieldErrors, fields });

  try {
    switch (authType) {
      case "login": {
        const loginResponse = await login({ username, password });
        const { token, expiresIn } = loginResponse.data.login;
        if (token) {
          const authSession = await setupToken(request, token);
          return redirect("/", {
            headers: {
              "Set-Cookie": await authSession.commit(new Date(expiresIn)),
            },
          });
        }
      }
      case "register": {
        const registerResponse = await signup({ username, password });
        const { token, expiresIn } = registerResponse.data.signup;
        if (token) {
          const authSession = await setupToken(request, token);
          return redirect("/", {
            headers: {
              "Set-Cookie": await authSession.commit(new Date(expiresIn)),
            },
          });
        }
      }
      default: {
        return badRequest({
          fields,
          formError: `Auth type invalid`,
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
  return <AuthLayout />;
}

export function CatchBoundary() {
  const caught = useCatch();
  console.log(caught);

  return <div>Huh... Couldn't find an client with the ID of:</div>;
}
