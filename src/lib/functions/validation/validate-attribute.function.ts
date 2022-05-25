import {AttributeMetadata, ModelValidationResult} from "../../models";

import {createMissingAttributeValueError} from "./create-missing-attribute-value-error.function";
import {createMinViolationError} from "./create-min-violation-error.function";
import {createMaxViolationError} from "./create-max-violation-error.function";
import {isNullOrUndefined} from "./is-null-or-undefined.function";
import {notNullOrUndefined} from "./not-null-or-undefined.function";
import {createEmptyModelValidationResult} from "./create-empty-model-validation-result.function";

export function validateAttribute<TValue>(payload: {
    readonly value: TValue;
    readonly attributePath: string;
    readonly attributeMetadata?: AttributeMetadata<TValue>;
    readonly modelId: string;
    readonly modelType: string;
}): ModelValidationResult {

    const value = payload.value;
    const attributePath = payload.attributePath;
    const metadata = payload.attributeMetadata;
    const modelId = payload.modelId;
    const modelType = payload.modelType;

    if (isNullOrUndefined(metadata)) return {isValid: true};

    const result = createEmptyModelValidationResult();

    if (isNullOrUndefined(value)) {
        if (metadata.isRequired) {
            result.isValid = false;
            result.errors.push(createMissingAttributeValueError({
                value, attributePath, modelId, modelType
            }));
        }
    } else {
        let resolvedValue: number;

        if (typeof value === "number") resolvedValue = value;
        else if (typeof value === "string") resolvedValue = value.length;
        else if (Array.isArray(value)) resolvedValue = value.length;

        if (notNullOrUndefined(metadata.max) && resolvedValue > metadata.max) {
            result.isValid = false;
            result.errors.push(createMaxViolationError({
                value: resolvedValue, max: metadata.max, attributePath, modelId, modelType
            }));
        }

        if (notNullOrUndefined(metadata.min) && resolvedValue < metadata.min) {
            result.isValid = false;
            result.errors.push(createMinViolationError({
                value: resolvedValue, min: metadata.min, attributePath, modelId, modelType
            }));
        }

    }

    if (result.isValid) delete result.errors;

    return result;
}
