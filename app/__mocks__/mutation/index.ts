import { auth } from "./auth";
import { set } from "./set";
import { term } from "./term";

import type { TDb } from "../handlers";

export const mutation = ({ sets, levels, terms }: TDb) => [
  ...auth(),
  ...set(sets, levels),
  ...term(terms),
];
