import { ModelValidationResult } from "./validation";
import { AttributeMetadata } from "./attribute-metadata.model";
import { ArrayMetadata } from "./array-metadata.model";

export type ValidateArray<TArray extends any[]> = (payload: {
    readonly array: TArray;
    readonly attributePath?: string;
    readonly arrayMetadata?: ArrayMetadata<TArray[0]>;
    readonly modelId: string;
    readonly modelType: string;
}) => ModelValidationResult;