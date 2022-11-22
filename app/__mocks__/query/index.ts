import { set } from "./set";

import type { TDb } from "../handlers";

export const query = ({ sets }: TDb) => [...set(sets)];
