import { Many } from "./many.model";

export type OneOrMany<T> = T | Many<T>;
