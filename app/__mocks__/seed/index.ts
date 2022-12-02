import { faker } from "@faker-js/faker";
import { v4 as uuid } from "uuid";

import { Level } from "~/types/enums";

import type { TLevelDB, TSetDB, TTermDB } from "~/types/db";

const levels: TLevelDB[] = [];

const terms: TTermDB[] = [];

const createNewWord = (levelId: string) => {
  [...Array(6)].forEach(() => {
    const term = {
      id: uuid(),
      name: faker.word.adjective(),
      definition: faker.lorem.sentence(),
      levelId,
      updatedAt: new Date(Date.now()),
    };
    terms.push(term);
  });
};

const createNewLevel = (setId: string) => {
  Object.values(Level).forEach((level) => {
    const newLevel = {
      id: uuid(),
      name: Level[level],
      setId,
    };
    levels.push(newLevel);
    createNewWord(newLevel.id);
  });
};

const seedSet: () => TSetDB[] = () =>
  [...Array(100)].map(() => {
    const set = {
      id: uuid(),
      title: faker.word.noun(),
      description: faker.lorem.paragraph(),
      userId: "user_0",
      updatedAt: faker.date.past(1),
    };

    createNewLevel(set.id);

    return set;
  });

export { seedSet, levels, terms };
