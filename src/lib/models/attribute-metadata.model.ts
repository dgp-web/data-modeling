import { CommonType } from "./common-type.model";

export interface AttributeMetadata<T = number, TScale = number> {
    readonly label?: string;
    readonly placeholder?: string;
    readonly hint?: string;
    readonly description?: string;
    readonly icon?: string;
    readonly isSecret?: boolean;
    readonly isRequired?: boolean;
    readonly type?: CommonType;
    readonly defaultValue?: T;
    readonly min?: TScale;
    readonly max?: TScale;
    readonly step?: TScale;
}

