import { auth } from "./auth";
import { set } from "./set";
import { card } from "./card";

import type { TDb } from "../handlers";

export const mutation = ({ sets }: TDb) => [...auth(), ...set(sets), ...card()];
