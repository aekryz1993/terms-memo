import { Level } from "~/types/enums";
import { newSetBody } from "./set";
import { userInputError } from "./responses";

import type { TLevelDB } from "~/types/db";
import type { TLevelBody } from "~/types/endpoints";

const levels: TLevelDB[] = [
  { id: "Perfect-set_0", name: Level.Perfect, setId: "set_0" },
  { id: "Medium-set_0", name: Level.Medium, setId: "set_0" },
  { id: "Difficult-set_0", name: Level.Difficult, setId: "set_0" },
];

const createLevelDataResponse = (newLevel: TLevelBody) => ({
  ...newLevel,
  __typename: "Card",
});

const perfectLvel: Readonly<TLevelBody> = {
  name: Level.Perfect,
  setId: newSetBody.title,
};

const mediumLevel: Readonly<TLevelBody> = {
  name: Level.Medium,
  setId: newSetBody.title,
};

const difficultLevel: Readonly<TLevelBody> = {
  name: Level.Difficult,
  setId: newSetBody.title,
};

const notExistLevel = userInputError("This level is not exist");

export {
  levels,
  createLevelDataResponse,
  perfectLvel,
  mediumLevel,
  difficultLevel,
  notExistLevel,
};
