import {ModelValidationError} from "../../models";

export function createMissingAttributeValueError(payload: {
    readonly value: any;
    readonly attributePath: string;
    readonly modelId: string;
    readonly modelType: string;
}): ModelValidationError {
    const value = payload.value;
    const attributePath = payload.attributePath;
    const modelId = payload.modelId;
    const modelType = payload.modelType;

    return {
        title: "Missing attribute value",
        message: `The attribute '${attributePath}' is required but '${value}' was passed.`,
        modelId, modelType, attributePath
    };
}
