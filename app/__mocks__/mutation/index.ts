import { auth } from "./auth";
import { set } from "./set";
import { card } from "./card";

export const mutation = () => [...auth(), ...set(), ...card()];
