import { v4 as uuid } from "uuid";

import { forbiddenError } from "../mocks/auth";
import {
  alreadyExistTerm,
  deleteTerm,
  notExistTerm,
  updateTerm,
} from "../mocks/term";
import { apiGraph, validAuth } from "../helpers";
import { findOne } from "../mocks/queries";
import { createDataResponse } from "../mocks/responses";

import type { TTermDB } from "~/types/db";
import { deleteDataResponse } from "../mocks/responses";

const createTermMock = (terms: TTermDB[]) =>
  apiGraph.mutation("CreateSet", async (req, res, ctx) => {
    const { user } = await validAuth(req);
    if (!user) return res(ctx.errors([forbiddenError]));

    const { levelId, name, definition } = req.variables;

    if (!levelId) return res(ctx.errors([notExistTerm]));

    const existTerm = findOne(terms, { label: "name", value: name });

    if (existTerm) return res(ctx.errors([alreadyExistTerm]));

    const newTerm = {
      id: uuid(),
      name,
      definition,
      levelId,
      updatedAt: new Date(Date.now()),
    };

    terms.push(newTerm);

    return res(
      ctx.data({
        createTerm: createDataResponse({
          docName: "term",
          doc: newTerm,
          message: "A new term is successfully created",
        }),
      })
    );
  });

const editTermMock = (terms: TTermDB[]) =>
  apiGraph.mutation("EditSet", async (req, res, ctx) => {
    const { name, definition, id } = req.variables;

    const { user } = await validAuth(req);
    if (!user) return res(ctx.errors([forbiddenError]));

    const existTerm = updateTerm(terms, { name, definition, id });

    if (!existTerm) return res(ctx.errors([notExistTerm]));

    const { updatedTerm, updatedTermIndex } = existTerm;

    terms[updatedTermIndex] = updatedTerm;

    return res(
      ctx.data({
        updateTerm: createDataResponse({
          docName: "term",
          doc: updatedTerm,
          message: "The term is successfully updated",
        }),
      })
    );
  });

const deleteTermMock = (terms: TTermDB[]) =>
  apiGraph.mutation("DeleteSet", async (req, res, ctx) => {
    const { id } = req.variables;

    const { user } = await validAuth(req);
    if (!user) return res(ctx.errors([forbiddenError]));

    const deleteSetIndex = deleteTerm(terms, { id });

    if (!deleteSetIndex) return res(ctx.errors([notExistTerm]));

    terms.splice(deleteSetIndex, 1);

    return res(
      ctx.data({
        deleteSet: deleteDataResponse("The term is successfully deleted"),
      })
    );
  });

export const term = (terms: TTermDB[]) => [
  createTermMock(terms),
  editTermMock(terms),
  deleteTermMock(terms),
];
