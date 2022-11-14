import { mutation } from "./mutation";
import { query } from "./query";

export const handlers = [...query(), ...mutation()];
