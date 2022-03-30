import {Immutable} from "../models";

export interface MutableModal {
    readonly createdAt: Date;
    readonly label: string;
    readonly list: Array<number>;
}

export type ImmutableDerivate = Immutable<MutableModal>;

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


immutableInstance.list.sort();
