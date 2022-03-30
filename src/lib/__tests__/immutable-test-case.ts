import {Immutable, Many, Mutable} from "../models";

export interface MutableModal {
    readonly createdAt: Date;
    readonly label: string;
    readonly list: Array<number>;
}

export type ImmutableDerivate = Immutable<MutableModal>;
export type MutableReversion = Mutable<ImmutableDerivate>;

const immutableInstance: ImmutableDerivate = {
    label: "",
    createdAt: new Date(),
    list: []
};

const mutableInstance: MutableModal = {
    label: "",
    createdAt: new Date(),
    list: []
};

const mutableVersionInstance: MutableReversion = {
    label: "",
    createdAt: new Date(),
    list: []
};

immutableInstance.list.sort();

export type MutableMany<T> = Mutable<Many<T>>;

const mutableMany: MutableMany<number> = [];
