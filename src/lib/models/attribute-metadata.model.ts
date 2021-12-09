export interface AttributeMetadata<T = number, TScale = number> {
    readonly label?: string;
    readonly hint?: string;
    readonly description?: string;
    readonly icon?: string;
    readonly defaultValue?: T;
    readonly min?: TScale;
    readonly max?: TScale;
    readonly step?: TScale;
    readonly isSecret?: boolean;
    readonly isRequired?: boolean;
}

