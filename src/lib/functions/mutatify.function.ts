import {Mutable} from "../models";

/**
 * Types the passed payload as readonly
 */
export function mutatify<T>(payload: T): Mutable<T> {
    return payload as Mutable<T>;
}
