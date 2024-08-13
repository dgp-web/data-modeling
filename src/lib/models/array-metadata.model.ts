import {ResolvedMetadata} from "./resolved-metadata.model";
import { ValidateArray } from "./validate-array.model";

export interface ArrayMetadata<TItem> {
    readonly description?: string;
    readonly hint?: string;
    readonly icon?: string;
    readonly item?: ResolvedMetadata<TItem>;
    readonly defaultValue?: Array<TItem>;
    readonly label?: string;
    readonly max?: number;
    readonly min?: number;
    readonly isRequired?: boolean;
    readonly secret?: boolean;
    readonly additionalValidation?: ValidateArray<Array<TItem>>;
}