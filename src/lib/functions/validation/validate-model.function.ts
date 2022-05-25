import {validateArray} from "./validate-array.function";
import {validateAttribute} from "./validate-attribute.function";
import {createMissingAttributeValueError} from "./create-missing-attribute-value-error.function";
import {ModelMetadata, ModelValidationResult} from "../../models";
import {isNullOrUndefined} from "./is-null-or-undefined.function";
import {createEmptyModelValidationResult} from "./create-empty-model-validation-result.function";

export const validateModelConfig = {
    validateArray,
    validateModel,
    validateAttribute
};

export function validateModel<TModel>(
    payload: {
        readonly model: TModel;
        readonly attributePath?: string;
        readonly modelMetadata?: ModelMetadata<TModel>;
        readonly modelId: string;
        readonly modelType: string;
    },
    config = validateModelConfig
): ModelValidationResult {

    const model = payload.model;
    const metadata = payload.modelMetadata;
    const modelId = payload.modelId;
    const modelType = payload.modelType;
    const rootAttributePath = payload.attributePath || "";

    if (isNullOrUndefined(metadata)) return {isValid: true};

    const result = createEmptyModelValidationResult();

    if (isNullOrUndefined(model)) {
        if (metadata.isRequired) {
            result.isValid = false;
            result.errors.push(createMissingAttributeValueError({
                value: model, attributePath: rootAttributePath, modelId, modelType
            }));
        }
    }

    if (isNullOrUndefined(metadata.attributes)) {
        if (result.isValid) delete result.errors;
        return result;
    }

    Object.keys(metadata.attributes).forEach(attributeKey => {

        const resolvedMetadata = metadata.attributes[attributeKey] as { isRequired?: boolean; };
        const attributePath = rootAttributePath ? rootAttributePath + "." + attributeKey : attributeKey;

        if (isNullOrUndefined(model[attributeKey])) {
            if (resolvedMetadata.isRequired) {
                result.isValid = false;
                result.errors.push(createMissingAttributeValueError({
                    value: model[attributeKey], attributePath, modelId, modelType
                }));
            }
        } else {
            let r: ModelValidationResult;

            if (Array.isArray(model[attributeKey])) {
                r = config.validateArray({
                    array: model[attributeKey], attributePath, arrayMetadata: resolvedMetadata, modelId, modelType
                }, config);
            } else if (typeof model[attributeKey] === "object") {
                r = config.validateModel({
                    model: model[attributeKey], attributePath, modelMetadata: resolvedMetadata, modelId, modelType
                }, config);
            } else {
                r = config.validateAttribute({
                    value: model[attributeKey], attributePath, attributeMetadata: resolvedMetadata, modelId, modelType
                });
            }

            if (!r.isValid) {
                result.isValid = false;
                result.errors = result.errors.concat(r.errors);
            }

        }

    });

    if (result.isValid) delete result.errors;

    return result;
}
