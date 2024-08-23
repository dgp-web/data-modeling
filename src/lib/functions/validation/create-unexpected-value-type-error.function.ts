import { CommonType, ExtendedTypeMap, ModelValidationError } from "../../models";
import { unexpectedValueTypeErrorTitle } from "../../constants";

export function createUnexpectedValueTypeError(payload: {
    readonly actualType: string;
    readonly expectedType: CommonType | ExtendedTypeMap;
    readonly modelId: string;
    readonly modelType: string;
    readonly attributePath: string
}): ModelValidationError {
    const actualType = payload.actualType;
    const attributePath = payload.attributePath;
    const modelId = payload.modelId;
    const modelType = payload.modelType;
    const expectedType = payload.expectedType;

    return {
        title: unexpectedValueTypeErrorTitle,
        message: `The attribute '${attributePath}'s type is expected to be ${expectedType} but ${actualType} was received.`,
        modelId, modelType, attributePath
    };
}