import { filterItems, findMany } from "./queries";
import { userInputError } from "./responses";

import type { TSetDB } from "~/types/db";
import type { TSetBody } from "~/types/endpoints";

const dbSets: () => TSetDB[] = () => [
  {
    id: "set_0",
    title: "set_0",
    description: "set_0_description",
    userId: "user_0",
    updatedAt: new Date(Date.now()),
  },
];

const newSetBody: Readonly<TSetBody> = {
  title: "set_1",
  description: "set_1_description",
};

const newSet: Readonly<TSetBody> = {
  title: newSetBody.title,
  description: newSetBody.description,
};

const getSets = (
  sets: TSetDB[],
  {
    skip,
    userId,
    take,
    search,
  }: { skip: number; userId: string; take: number; search?: string }
) => {
  const setsByUser = findMany(sets, { label: "userId", value: userId });

  return filterItems(
    setsByUser,
    { skip, take, search },
    { searchField: "title" }
  );
};

const updateSet = (
  sets: TSetDB[],
  { title, description, id }: Pick<TSetDB, "title" | "description" | "id">
) => {
  const updatedSetIndex = sets.findIndex((set) => set.id === id);
  if (updatedSetIndex < 0) return false;

  const updatedSet = {
    ...sets[updatedSetIndex],
    title,
    description,
    updatedAt: new Date(Date.now()),
  };

  return { updatedSet, updatedSetIndex };
};

const deleteSet = (sets: TSetDB[], { id }: Pick<TSetDB, "id">) => {
  const deleteSetIndex = sets.findIndex((set) => set.id === id);
  if (deleteSetIndex < 0) return false;

  return deleteSetIndex;
};

const buildSet = ({
  title,
  description,
  userId,
}: {
  title: string;
  description: string;
  userId: string;
}) => ({ id: title, title, description, userId });

const notExistSet = userInputError("This set is not exist");
const alreadyExistSet = userInputError("This set's name is already exist");

export {
  dbSets,
  newSetBody,
  newSet,
  getSets,
  updateSet,
  deleteSet,
  buildSet,
  notExistSet,
  alreadyExistSet,
};
