import { apiGraph, validAuth } from "../helpers";
import { forbiddenError } from "../mocks/auth";
import { findById, findMany } from "../mocks/queries";
import { findAllSetTerms, findLevelTerms } from "../mocks/term";
import { notExistSet } from "../mocks/set";

import type { TLevelDB, TTermDB } from "~/types/db";

const fetchLevelTermsMock = (terms: TTermDB[], levels: TLevelDB[]) =>
  apiGraph.query("LevelTerms", async (req, res, ctx) => {
    const { levelId, skip, take, search } = req.variables;
    if (!levelId) return res(ctx.errors([notExistSet]));

    const { user } = await validAuth(req);

    if (!user) return res(ctx.errors([forbiddenError]));

    const level = findById(levels, { id: levelId });

    const levelTerms = findLevelTerms(terms, level, { skip, take, search });

    return res(
      ctx.data({
        levelTerms,
      })
    );
  });

const fetchSetTermsMock = (terms: TTermDB[], levels: TLevelDB[]) =>
  apiGraph.query("SetTerms", async (req, res, ctx) => {
    const { setId, skip, take, search } = req.variables;
    if (!setId) return res(ctx.errors([notExistSet]));

    const { user } = await validAuth(req);

    if (!user) return res(ctx.errors([forbiddenError]));

    const setLevels: TLevelDB[] = findMany(levels, {
      label: "setId",
      value: setId,
    });

    const setTerms = findAllSetTerms(terms, setLevels, { skip, take, search });

    return res(
      ctx.data({
        setTerms,
      })
    );
  });

export const term = (terms: TTermDB[], levels: TLevelDB[]) => [
  fetchLevelTermsMock(terms, levels),
  fetchSetTermsMock(terms, levels),
];
