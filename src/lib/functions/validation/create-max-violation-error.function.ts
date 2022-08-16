import {ModelValidationError} from "../../models";

export function createMaxViolationError(payload: {
    readonly value: number;
    readonly attributePath: string;
    readonly max: number;
    readonly modelId: string;
    readonly modelType: string;
}): ModelValidationError {
    const value = payload.value;
    const attributePath = payload.attributePath;
    const modelId = payload.modelId;
    const modelType = payload.modelType;
    const max = payload.max;

    return {
        title: "Allowed maximum violated",
        message: `The attribute '${attributePath}'s value or length of '${value}' is above the allowed maximum '${max}'.`,
        modelId, modelType, attributePath
    };
}
