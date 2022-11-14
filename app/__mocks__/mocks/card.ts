import type { TCardDB } from "~/types/db";
import type { TCardBody } from "~/types/endpoints";
import { CardName } from "~/types/enums";
import { newSetBody } from "./set";

export const cards: TCardDB[] = [
  { id: "Perfect-set_0", name: CardName.Perfect, setId: "set_0" },
  { id: "Medium-set_0", name: CardName.Medium, setId: "set_0" },
  { id: "Difficult-set_0", name: CardName.Difficult, setId: "set_0" },
];

export const createCardDataResponse = (newCard: TCardBody) => ({
  ...newCard,
  __typename: "Card",
});

export const perfectCard: Readonly<TCardBody> = {
  name: CardName.Perfect,
  setId: newSetBody.title,
};

export const mediumCard: Readonly<TCardBody> = {
  name: CardName.Medium,
  setId: newSetBody.title,
};

export const difficultCard: Readonly<TCardBody> = {
  name: CardName.Difficult,
  setId: newSetBody.title,
};
