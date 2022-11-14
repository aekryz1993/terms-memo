import { apiGraph, validAuth } from "../helpers";
import { forbiddenError } from "../mocks/auth";
import { getSets } from "../mocks/set";

const fetchSetsMock = () =>
  apiGraph.query("Sets", (req, res, ctx) => {
    const { skip, take } = req.variables;

    const user = validAuth(req);

    if (!user) return res(ctx.errors([forbiddenError]));

    const sets = getSets(skip, take);

    return res(
      ctx.data({
        sets,
      })
    );
  });

export const set = () => [fetchSetsMock()];
