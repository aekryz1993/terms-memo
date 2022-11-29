import { CardName } from "~/types/enums";
import { forbiddenError } from "../mocks/auth";
import { cards } from "../mocks/card";
import {
  checkExistSet,
  createSetDataResponse,
  deleteSet,
  delteDataResponse,
  existSetError,
  notExistSetError,
  updateSet,
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
        createSet: createSetDataResponse(
          newSet,
          "A new set is successfully created"
        ),
      })
    );
  });

const editSetMock = (sets: TSetDB[]) =>
  apiGraph.mutation("EditSet", async (req, res, ctx) => {
    const { title, description, id } = req.variables;

    const { user } = await validAuth(req);

    if (!user) return res(ctx.errors([forbiddenError]));

    const existSet = updateSet(sets, { title, description, id });

    if (!existSet) return res(ctx.errors([notExistSetError]));

    const { updatedSet, updatedSetIndex } = existSet;

    sets[updatedSetIndex] = updatedSet;

    return res(
      ctx.data({
        updateSet: createSetDataResponse(
          updatedSet,
          "The set is successfully updated"
        ),
      })
    );
  });

const deleteSetMock = (sets: TSetDB[]) =>
  apiGraph.mutation("DeleteSet", async (req, res, ctx) => {
    const { id } = req.variables;

    const { user } = await validAuth(req);

    if (!user) return res(ctx.errors([forbiddenError]));

    const deleteSetIndex = deleteSet(sets, { id });

    if (!deleteSetIndex) return res(ctx.errors([notExistSetError]));

    sets.splice(deleteSetIndex, 1);

    return res(
      ctx.data({
        deleteSet: delteDataResponse("The set is successfully deleted"),
      })
    );
  });

export const set = (sets: TSetDB[]) => [
  createSetMock(sets),
  editSetMock(sets),
  deleteSetMock(sets),
];
