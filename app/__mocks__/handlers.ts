// import { dbSets } from "./mocks/set";
import { mutation } from "./mutation";
import { query } from "./query";
import { seedSet, levels, terms } from "./seed";

import type { TLevelDB, TSetDB, TTermDB } from "~/types/db";
export interface TDb {
  sets: TSetDB[];
  levels: TLevelDB[];
  terms: TTermDB[];
}

// const sets = dbSets();
const sets = seedSet();

export const handlers = [
  ...query({ sets, levels, terms }),
  ...mutation({ sets, levels, terms }),
];
