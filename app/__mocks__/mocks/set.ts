import type { TSetDB } from "~/types/db";
import type { TSetBody } from "~/types/endpoints";

export const dbSets: () => TSetDB[] = () => [
  {
    id: "set_0",
    title: "set_0",
    description: "set_0_description",
    userId: "user_0",
    updatedAt: new Date(Date.now()),
  },
];

export const newSetBody: Readonly<TSetBody> = {
  title: "set_1",
  description: "set_1_description",
};

export const newSet: Readonly<TSetBody> = {
  title: newSetBody.title,
  description: newSetBody.description,
};

export const createSetDataResponse = (set: TSetBody, message: string) => ({
  set,
  statusCode: 200,
  message,
});

export const delteDataResponse = (message: string) => ({
  statusCode: 200,
  message,
});

export const checkExistSet = (title: string, sets: TSetDB[]) =>
  sets.find((set) => set.title === title);

export const existSetError = {
  message: "This set's name is already exist",
  errorType: "UserInputError",
};

export const notExistSetError = {
  message: "This set is not exist",
  errorType: "UserInputError",
};

export const getSets = (
  sets: TSetDB[],
  {
    skip,
    userId,
    take,
    search,
  }: { skip: number; userId: string; take: number; search?: string }
) => {
  const setsByUser = sets.filter((set) => set.userId === userId);

  if (setsByUser.length === 0)
    return {
      sets: setsByUser,
      tatolSets: 0,
      totalPages: 0,
      currentPage: 1,
    };

  const sortedSetsByDate = setsByUser.sort(
    (a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()
  );

  const searchedSets = search
    ? sortedSetsByDate.filter((set) =>
        set.title.toLowerCase().includes(search.toLowerCase())
      )
    : sortedSetsByDate;

  const fetchedSets = searchedSets.slice(skip).slice(0, take);
  return {
    sets: fetchedSets,
    tatolSets: searchedSets.length,
    totalPages: Math.ceil(searchedSets.length / take),
    currentPage: skip / take + 1,
  };
};

export const updateSet = (
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

export const deleteSet = (sets: TSetDB[], { id }: Pick<TSetDB, "id">) => {
  const deleteSetIndex = sets.findIndex((set) => set.id === id);
  if (deleteSetIndex < 0) return false;

  return deleteSetIndex;
};

export const buildSet = ({
  title,
  description,
  userId,
}: {
  title: string;
  description: string;
  userId: string;
}) => ({ id: title, title, description, userId });
