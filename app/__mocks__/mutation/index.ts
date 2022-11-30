import { auth } from "./auth";
import { set } from "./set";
import { level } from "./level";

import type { TDb } from "../handlers";

export const mutation = ({ sets }: TDb) => [
  ...auth(),
  ...set(sets),
  ...level(),
];
