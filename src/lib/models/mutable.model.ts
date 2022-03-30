import {ReadonlyDate} from "./readonly-date.model";
import {AnyArray} from "./any-array.model";

export type Mutable<T> = T extends AnyArray<(infer Item)> ? Array<Mutable<Item>> : {
    -readonly [P in keyof T]: T[P] extends ReadonlyDate
        ? Date
        : T[P] extends AnyArray<(infer Item)>
            ? Array<Mutable<Item>>
            : Mutable<T[P]>
};
