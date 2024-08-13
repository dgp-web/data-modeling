import { ModelValidationResult } from "./validation";
import { AttributeMetadata } from "./attribute-metadata.model";

export type ValidateAttribute<T = number, TScale = number> = (payload: {
    readonly value: T;
    readonly attributePath: string;
    readonly attributeMetadata?: AttributeMetadata<T, TScale>;
    readonly modelId: string;
    readonly modelType: string;
}) => ModelValidationResult;