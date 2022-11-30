import { apiGraph, validAuth } from "../helpers";
import { forbiddenError } from "../mocks/auth";
import { getSets } from "../mocks/set";

import type { TSetDB } from "~/types/db";
import { findById } from "../mocks/queries";

const fetchSetsMock = (sets: TSetDB[]) =>
  apiGraph.query("Sets", async (req, res, ctx) => {
    const { skip, take, search } = req.variables;

    const { user } = await validAuth(req);

    if (!user) return res(ctx.errors([forbiddenError]));

    const fetchSets = getSets(sets, { skip, take, search, userId: user.id });

    return res(
      ctx.data({
        fetchSets,
      })
    );
  });

const fetchSetMock = (sets: TSetDB[]) =>
  apiGraph.query("Set", async (req, res, ctx) => {
    const { id } = req.variables;

    const { user } = await validAuth(req);

    if (!user) return res(ctx.errors([forbiddenError]));

    const set = findById(sets, { id });

    return res(
      ctx.data({
        fetchSet: {
          set,
        },
      })
    );
  });

export const set = (sets: TSetDB[]) => [
  fetchSetsMock(sets),
  fetchSetMock(sets),
];
