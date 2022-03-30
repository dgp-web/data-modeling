import {Immutable} from "../models";

export interface MutableModal {
    readonly createdAt: Date;
    readonly label: string;
}

export type ImmutableDerivate = Immutable<MutableModal>;

const immutableInstance: ImmutableDerivate = {
    label: "",
    createdAt: new Date()
};

const mutableInstance: MutableModal = {
    label: "",
    createdAt: new Date()
};
