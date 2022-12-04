import { v4 as uuid } from "uuid";

import { Level } from "~/types/enums";
import { forbiddenError } from "../mocks/auth";
import { levels } from "../mocks/level";
import {
  alreadyExistSet,
  deleteSet,
  notExistSet,
  updateSet,
} from "../mocks/set";
import { apiGraph, validAuth } from "../helpers";
import { createDataResponse, deleteDataResponse } from "../mocks/responses";
import { findOne } from "../mocks/queries";

import type { TSetDB } from "~/types/db";

const createSetMock = (sets: TSetDB[]) =>
  apiGraph.mutation("CreateSet", async (req, res, ctx) => {
    const { title, description } = req.variables;

    const { user } = await validAuth(req);

    if (!user) return res(ctx.errors([forbiddenError]));

    const existSet = findOne(sets, { label: "title", value: title });

    if (existSet) return res(ctx.errors([alreadyExistSet]));

    const newSet = {
      id: uuid(),
      title,
      description,
      userId: user.id,
      updatedAt: new Date(Date.now()),
    };

    sets.push(newSet);

    if (process.env.NODE_ENV !== "test") {
      [Level.Perfect, Level.Medium, Level.Difficult].forEach((cardName) => {
        levels.push({
          id: uuid(),
          name: cardName,
          setId: title,
        });
      });
    }

    return res(
      ctx.data({
        createSet: createDataResponse({
          docName: "set",
          doc: newSet,
          message: "A new set is successfully created",
        }),
      })
    );
  });

const editSetMock = (sets: TSetDB[]) =>
  apiGraph.mutation("EditSet", async (req, res, ctx) => {
    const { title, description, id } = req.variables;

    const { user } = await validAuth(req);

    if (!user) return res(ctx.errors([forbiddenError]));

    const existSet = updateSet(sets, { title, description, id });

    if (!existSet) return res(ctx.errors([notExistSet]));

    const { updatedSet, updatedSetIndex } = existSet;

    sets[updatedSetIndex] = updatedSet;

    return res(
      ctx.data({
        updateSet: createDataResponse({
          docName: "set",
          doc: updatedSet,
          message: "The set is successfully updated",
        }),
      })
    );
  });

const deleteSetMock = (sets: TSetDB[]) =>
  apiGraph.mutation("DeleteSet", async (req, res, ctx) => {
    const { id } = req.variables;

    const { user } = await validAuth(req);

    if (!user) return res(ctx.errors([forbiddenError]));

    const deleteSetIndex = deleteSet(sets, { id });

    if (!deleteSetIndex) return res(ctx.errors([notExistSet]));

    sets.splice(deleteSetIndex, 1);

    return res(
      ctx.data({
        deleteSet: deleteDataResponse("The set is successfully deleted"),
      })
    );
  });

export const set = (sets: TSetDB[]) => [
  createSetMock(sets),
  editSetMock(sets),
  deleteSetMock(sets),
];
