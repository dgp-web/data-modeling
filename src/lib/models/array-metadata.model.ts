import {ResolvedMetadata} from "./resolved-metadata.model";

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
}