import { CommonType } from "./common-type.model";
import { ExtendedTypeMap } from "./extended-type-map.model";

export interface AttributeMetadata<T = number, TScale = number> {
    readonly label?: string;
    readonly placeholder?: string;
    readonly hint?: string;
    readonly description?: string;
    readonly icon?: string;
    readonly isSecret?: boolean;
    readonly isRequired?: boolean;
    readonly type?: CommonType | ExtendedTypeMap;
    readonly defaultValue?: T;
    readonly min?: TScale;
    readonly max?: TScale;
    readonly step?: TScale;
}

