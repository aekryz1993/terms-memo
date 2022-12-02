import { filterItems, findMany } from "./queries";

import type { TLevelDB, TTermDB } from "~/types/db";

const findAllSetTerms = (
  terms: TTermDB[],
  levels: TLevelDB[],
  { skip, take, search }: { skip: number; take: number; search?: string }
) => {
  let setTerms: TTermDB[] = [];

  for (let level of levels) {
    const termsByLevel = findMany(terms, { label: "setId", value: level.id });
    if (termsByLevel?.length)
      setTerms = setTerms.length
        ? [...setTerms, ...termsByLevel]
        : [...termsByLevel];
  }

  return filterItems(setTerms, { skip, take, search }, { searchField: "name" });
};

export { findAllSetTerms };
