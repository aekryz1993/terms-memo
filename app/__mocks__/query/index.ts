import { set } from "./set";
import { level } from "./level";
import { term } from "./term";

import type { TDb } from "../handlers";

export const query = ({ sets, levels, terms }: TDb) => [
  ...set(sets),
  ...level(levels),
  ...term(terms, levels),
];
