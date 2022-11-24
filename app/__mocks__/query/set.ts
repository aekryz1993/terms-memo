import { apiGraph, validAuth } from "../helpers";
import { forbiddenError } from "../mocks/auth";
import { getSets } from "../mocks/set";

import type { TSetDB } from "~/types/db";

const fetchSetsMock = (sets: TSetDB[]) =>
  apiGraph.query("Sets", async (req, res, ctx) => {
    const { skip, take, search } = req.variables;

    const { user } = await validAuth(req);

    if (!user) return res(ctx.errors([forbiddenError]));

    const fetchSets = getSets(sets, { skip, take, search });

    return res(
      ctx.data({
        fetchSets,
      })
    );
  });

export const set = (sets: TSetDB[]) => [fetchSetsMock(sets)];
