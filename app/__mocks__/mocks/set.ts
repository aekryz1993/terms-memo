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

export const createSetDataResponse = (newSet: TSetBody) => ({
  set: newSet,
  statusCode: 200,
  message: "A new set is successfully created",
});

export const checkExistSet = (title: string, sets: TSetDB[]) =>
  sets.find((set) => set.title === title);

export const existSetError = {
  message: "This set's name is already exist",
  errorType: "UserInputError",
};

export const getSets = (
  sets: TSetDB[],
  { skip, take, search }: { skip: number; take: number; search?: string }
) => {
  const searchedSets = search
    ? sets.filter((set) =>
        set.title.toLowerCase().includes(search.toLowerCase())
      )
    : sets;

  const fetchedSets = searchedSets.slice(skip).slice(0, take);
  return {
    sets: fetchedSets,
    tatolSets: searchedSets.length,
    totalPages: Math.ceil(searchedSets.length / take),
    currentPage: skip / take + 1,
  };
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
