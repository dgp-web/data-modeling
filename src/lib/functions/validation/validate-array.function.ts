import {createMissingAttributeValueError} from "./create-missing-attribute-value-error.function";
import {createMaxViolationError} from "./create-max-violation-error.function";
import {createMinViolationError} from "./create-min-violation-error.function";
import {validateModel} from "./validate-model.function";
import {validateAttribute} from "./validate-attribute.function";
import {ArrayMetadata, ModelValidationResult} from "../../models";
import {isNullOrUndefined} from "./is-null-or-undefined.function";
import {notNullOrUndefined} from "./not-null-or-undefined.function";
import {createEmptyModelValidationResult} from "./create-empty-model-validation-result.function";

export const validateArrayConfig = {
    validateArray,
    validateModel,
    validateAttribute
};

export function validateArray<TArray extends any[]>(
    payload: {
        readonly array: TArray;
        readonly attributePath?: string;
        readonly arrayMetadata?: ArrayMetadata<TArray[0]>;
        readonly modelId: string;
        readonly modelType: string;
    },
    config = validateArrayConfig
): ModelValidationResult {

    const value = payload.array;
    const metadata = payload.arrayMetadata;
    const attributePath = payload.attributePath || "";
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
        if (notNullOrUndefined(metadata.max) && value.length > metadata.max) {
            result.isValid = false;
            result.errors.push(createMaxViolationError({
                value: value.length, max: metadata.max, attributePath, modelId, modelType
            }));
        }

        if (notNullOrUndefined(metadata.min) && value.length < metadata.min) {
            result.isValid = false;
            result.errors.push(createMinViolationError({
                value: value.length, min: metadata.min, attributePath, modelId, modelType
            }));
        }

        value.forEach((item, index) => {
            const childAttributePath = attributePath + "." + index;
            let r: ModelValidationResult;

            if (Array.isArray(item)) {
                r = config.validateArray({
                    array: item,
                    attributePath: childAttributePath,
                    arrayMetadata: metadata.item,
                    modelId, modelType
                }, config);
            } else if (typeof item === "object") {
                r = config.validateModel({
                    model: item,
                    attributePath: childAttributePath,
                    modelMetadata: metadata.item,
                    modelId, modelType
                }, config);
            } else {
                r = config.validateAttribute({
                    value: item,
                    attributePath: childAttributePath,
                    attributeMetadata: metadata.item,
                    modelId, modelType
                });
            }

            if (!r.isValid) {
                result.isValid = false;
                result.errors = result.errors.concat(r.errors);
            }
        });

    }

    if (result.isValid) delete result.errors;

    return result;

}
