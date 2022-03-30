import {ReadonlyDate} from "./readonly-date.model";

/**
 * @tsoaModel
 */
export type Immutable<T> = {
    readonly [P in keyof T]: T[P] extends Date
        ? ReadonlyDate
        : Immutable<T[P]>
};
