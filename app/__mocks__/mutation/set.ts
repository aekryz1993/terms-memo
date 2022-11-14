import { CardName } from "~/types/enums";
import { forbiddenError } from "../mocks/auth";
import { cards } from "../mocks/card";
import {
  checkExistSet,
  createSetDataResponse,
  existSetError,
  sets,
} from "../mocks/set";
import { apiGraph, validAuth } from "../helpers";

const createSetMock = () =>
  apiGraph.mutation("CreateSet", (req, res, ctx) => {
    const { title, description } = req.variables;

    const user = validAuth(req);

    if (!user) return res(ctx.errors([forbiddenError]));

    const existSet = checkExistSet(title);

    if (existSet) return res(ctx.errors([existSetError]));

    sets.push({ id: title, title, description, userId: user.id });

    if (process.env.NODE_ENV !== "test") {
      [CardName.Perfect, CardName.Medium, CardName.Difficult].forEach(
        (cardName) => {
          cards.push({
            id: `${cardName}-${title}`,
            name: cardName,
            setId: title,
          });
        }
      );
    }

    return res(
      ctx.data({
        createSet: createSetDataResponse({ title, description }, user.id),
      })
    );
  });

export const set = () => [createSetMock()];
