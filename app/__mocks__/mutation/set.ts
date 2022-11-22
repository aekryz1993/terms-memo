import { CardName } from "~/types/enums";
import { forbiddenError } from "../mocks/auth";
import { cards } from "../mocks/card";
import {
  checkExistSet,
  createSetDataResponse,
  existSetError,
} from "../mocks/set";
import { apiGraph, validAuth } from "../helpers";

import type { TSetDB } from "~/types/db";

const createSetMock = (sets: TSetDB[]) =>
  apiGraph.mutation("CreateSet", async (req, res, ctx) => {
    const { title, description } = req.variables;

    const { user } = await validAuth(req);

    if (!user) return res(ctx.errors([forbiddenError]));

    const existSet = checkExistSet(title, sets);

    if (existSet) return res(ctx.errors([existSetError]));

    const newSet = {
      id: title,
      title,
      description,
      userId: user.id,
      updatedAt: new Date(Date.now()),
    };

    sets.push(newSet);

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
        createSet: createSetDataResponse(newSet),
      })
    );
  });

export const set = (sets: TSetDB[]) => [createSetMock(sets)];
