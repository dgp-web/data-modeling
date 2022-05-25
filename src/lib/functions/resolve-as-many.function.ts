import {Many, OneOrMany} from "../models";

export function resolveAsMany<T>(payload: OneOrMany<T>): Many<T> {
    if (Array.isArray(payload)) { // @ts-ignore
        return payload as T[];
    }
    return [payload as T];
}
