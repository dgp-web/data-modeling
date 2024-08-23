import { ModelValidationError } from "../../models";
import { implicitAdditionalAttributeErrorTitle } from "../../constants";

export function createImplicitAdditionalAttributeError(payload: {
    readonly attributeKey: string;
    readonly allowedAttributeKeys: string[];
    readonly modelId: string;
    readonly modelType: string;
    readonly attributePath: string;
}): ModelValidationError {
    const attributePath = payload.attributePath;
    const attributeKey = payload.attributeKey;
    const allowedAttributeKeys = payload.allowedAttributeKeys;
    const allowedAttributeKeyString = JSON.stringify(allowedAttributeKeys);

    return {
        title: implicitAdditionalAttributeErrorTitle,
        message: `The attribute '${attributeKey}' in '${attributePath}' is not allowed. Allowed attributes are ${allowedAttributeKeyString}.`,
        modelType: payload.modelType,
        modelId: payload.modelId,
        attributePath: payload.attributePath,
    };
}