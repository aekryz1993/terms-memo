import type { TSetDB } from "~/types/db";
import type { TSetBody } from "~/types/endpoints";

export const sets: TSetDB[] = [
  {
    id: "set_0",
    title: "set_0",
    description: "set_0_description",
    userId: "user_0",
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

export const createSetDataResponse = (newSet: TSetBody, userId: string) => ({
  set: {
    id: newSet.title,
    title: newSet.title,
    description: newSet.description,
    userId,
    __typename: "Set",
  },
  statusCode: 200,
  message: "A new set is successfully created",
});

export const checkExistSet = (title: string) =>
  sets.find((set) => set.title === title);

export const existSetError = {
  message: "This set's name is already exist",
  errorType: "UserInputError",
};

export const getSets = (skip: number, take: number) =>
  sets.slice(skip).slice(0, take);

export const buildSet = ({
  title,
  description,
  userId,
}: {
  title: string;
  description: string;
  userId: string;
}) => ({ id: title, title, description, userId });
