import { faker } from "@faker-js/faker";
import { v4 as uuid } from "uuid";

import type { TSetDB } from "~/types/db";

const seedSet: () => TSetDB[] = () =>
  [...Array(500)].map((_, index) => ({
    // id: uuid(),
    id: `set_${index + 1}`,
    title: faker.word.noun(),
    description: faker.lorem.paragraph(),
    userId: "user_0",
    updatedAt: faker.date.past(1),
  }));

export { seedSet };
