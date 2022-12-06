import { filterItems, findMany } from "./queries";
import { userInputError } from "./responses";

import type { TLevelDB, TTermDB } from "~/types/db";

const findTermsByLevel = (terms: TTermDB[], level: TLevelDB) =>
  findMany(terms, { label: "levelId", value: level.id });

const findAllSetTerms = (
  terms: TTermDB[],
  levels: TLevelDB[],
  { skip, take, search }: { skip: number; take: number; search?: string }
) => {
  let setTerms: TTermDB[] = [];

  for (let level of levels) {
    const termsByLevel = findTermsByLevel(terms, level);

    if (termsByLevel?.length)
      setTerms = setTerms.length
        ? [...setTerms, ...termsByLevel]
        : [...termsByLevel];
  }

  return filterItems(setTerms, { skip, take, search }, { searchField: "name" });
};

const findLevelTerms = (
  terms: TTermDB[],
  level: TLevelDB,
  { skip, take, search }: { skip: number; take: number; search?: string }
) => {
  const levelTerms = findTermsByLevel(terms, level);

  return filterItems(
    levelTerms,
    { skip, take, search },
    { searchField: "name" }
  );
};

const updateTerm = (
  terms: TTermDB[],
  { name, definition, id }: Pick<TTermDB, "name" | "definition" | "id">
) => {
  const updatedTermIndex = terms.findIndex((term) => term.id === id);
  if (updatedTermIndex < 0) return false;

  const updatedTerm = {
    ...terms[updatedTermIndex],
    name,
    definition,
    updatedAt: new Date(Date.now()),
  };

  return { updatedTerm, updatedTermIndex };
};

const moveTerm = (
  terms: TTermDB[],
  { levelId, id }: Pick<TTermDB, "levelId" | "id">
) => {
  const updatedTermIndex = terms.findIndex((term) => term.id === id);
  if (updatedTermIndex < 0) return false;

  const updatedTerm = {
    ...terms[updatedTermIndex],
    levelId,
    updatedAt: new Date(Date.now()),
  };

  return { updatedTerm, updatedTermIndex };
};

const deleteTerm = (terms: TTermDB[], { id }: Pick<TTermDB, "id">) => {
  const deleteTermIndex = terms.findIndex((term) => term.id === id);
  if (deleteTermIndex < 0) return false;

  return deleteTermIndex;
};

const notExistTerm = userInputError("This term is not exist");

const alreadyExistTerm = userInputError("This term's name is already exist");

export {
  findAllSetTerms,
  findLevelTerms,
  updateTerm,
  moveTerm,
  deleteTerm,
  notExistTerm,
  alreadyExistTerm,
};
