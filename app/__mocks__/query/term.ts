import { apiGraph, validAuth } from "../helpers";
import { forbiddenError } from "../mocks/auth";

import type { TTermDB } from "~/types/db";
import { findMany } from "../mocks/queries";

const fetchLevelTermsMock = (terms: TTermDB[]) =>
  apiGraph.query("LevelTerms", async (req, res, ctx) => {
    const { levelId } = req.variables;

    const { user } = await validAuth(req);

    if (!user) return res(ctx.errors([forbiddenError]));

    const levelTerms = findMany(terms, { label: "levelId", value: levelId });

    return res(
      ctx.data({
        levelTerms: {
          terms: levelTerms,
        },
      })
    );
  });

export const term = (terms: TTermDB[]) => [fetchLevelTermsMock(terms)];
