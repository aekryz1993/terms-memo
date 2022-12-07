import { apiGraph, validAuth } from "../helpers";
import { forbiddenError } from "../mocks/auth";
import { findById, findMany } from "../mocks/queries";

import type { TLevelDB } from "~/types/db";

const fetchSetLevelsMock = (levels: TLevelDB[]) =>
  apiGraph.query("SetLevels", async (req, res, ctx) => {
    const { setId } = req.variables;

    const { user } = await validAuth(req);

    if (!user) return res(ctx.errors([forbiddenError]));

    const setLevels = findMany(levels, { label: "setId", value: setId });

    return res(
      ctx.data({
        setLevels: {
          levels: setLevels,
        },
      })
    );
  });

const fetchLevelMock = (levels: TLevelDB[]) =>
  apiGraph.query("FetchLevel", async (req, res, ctx) => {
    const { id } = req.variables;

    const { user } = await validAuth(req);

    if (!user) return res(ctx.errors([forbiddenError]));

    const level = findById(levels, { id });

    return res(
      ctx.data({
        fetchLevel: {
          level,
        },
      })
    );
  });

export const level = (levels: TLevelDB[]) => [
  fetchSetLevelsMock(levels),
  fetchLevelMock(levels),
];
