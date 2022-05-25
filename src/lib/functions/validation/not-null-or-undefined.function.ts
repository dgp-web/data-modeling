import {isNullOrUndefined} from "./is-null-or-undefined.function";

export function notNullOrUndefined(value: any): boolean {
    return !isNullOrUndefined(value);
}