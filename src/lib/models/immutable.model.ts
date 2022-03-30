import {ReadonlyDate} from "./readonly-date.model";
import {AnyArray} from "./any-array.model";
import {Many} from "./many.model";

/**
 * @tsoaModel
 */
export type Immutable<T> = {
    readonly [P in keyof T]: T[P] extends Date
        ? ReadonlyDate
        : T[P] extends AnyArray<(infer Item)>
            ? Many<Item>
            : Immutable<T[P]>
};
