export interface ExtendedTypeMap {
    readonly integer: number;
    /**
     * float is not needed as it's covered by "number"
     */
    // readonly float: number;
}

export type ExtendedType = keyof ExtendedTypeMap;