// import { dbSets } from "./mocks/set";
import { mutation } from "./mutation";
import { query } from "./query";
import { seedSet } from "./seed";

import type { TSetDB } from "~/types/db";
export interface TDb {
  sets: TSetDB[];
}

// const sets = dbSets();
const sets = seedSet();

export const handlers = [...query({ sets }), ...mutation({ sets })];
