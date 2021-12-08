import {Many} from "./many.model";

export type AnyArray<T> = T[] | ReadonlyArray<T> | Many<T>;