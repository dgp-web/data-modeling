import {ModelValidationError} from "../../models";

export function createMinViolationError(payload: {
    readonly value: number;
    readonly attributePath: string;
    readonly min: number;
    readonly modelId: string;
    readonly modelType: string;
}): ModelValidationError {
    const value = payload.value;
    const attributePath = payload.attributePath;
    const modelId = payload.modelId;
    const modelType = payload.modelType;
    const min = payload.min;

    return {
        title: "Allowed minimum violated",
        message: `The attribute '${attributePath}'s value or length of '${value}' is below the allowed minimum '${min}'.`,
        modelId, modelType, attributePath
    };
}
