import { CommonType } from "./common-type.model";
import { ExtendedType } from "./extended-type-map.model";
import { ValidateAttribute } from "./validate-attribute.model";

export interface AttributeMetadata<T = number, TScale = number> {
    readonly label?: string;
    readonly placeholder?: string;
    readonly hint?: string;
    readonly description?: string;
    readonly icon?: string;
    readonly isSecret?: boolean;
    readonly isRequired?: boolean;
    readonly type?: CommonType | ExtendedType;
    readonly defaultValue?: T;
    readonly min?: TScale;
    readonly max?: TScale;
    readonly step?: TScale;
    readonly pattern?: RegExp;
    readonly additionalValidation?: ValidateAttribute<T, TScale>;
}

