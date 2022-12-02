import { apiGraph, validAuth } from "../helpers";
import { forbiddenError } from "../mocks/auth";
import { findMany } from "../mocks/queries";
import { findAllSetTerms } from "../mocks/term";
import { notExistSetError } from "../mocks/set";

import type { TLevelDB, TTermDB } from "~/types/db";

const fetchLevelTermsMock = (terms: TTermDB[]) =>
  apiGraph.query("LevelTerms", async (req, res, ctx) => {
    const { levelId } = req.variables;
    if (!levelId) return res(ctx.errors([notExistSetError]));

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

const fetchSetTermsMock = (terms: TTermDB[], levels: TLevelDB[]) =>
  apiGraph.query("SetTerms", async (req, res, ctx) => {
    const { setId, skip, take, search } = req.variables;
    if (!setId) return res(ctx.errors([notExistSetError]));

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
  fetchLevelTermsMock(terms),
  fetchSetTermsMock(terms, levels),
];
