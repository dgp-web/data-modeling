import { ArrayMetadata, AttributeMetadata, ModelMetadata, Secret } from "../../models";
import { isNullOrUndefined } from "../validation/is-null-or-undefined.function";
import { notNullOrUndefined } from "../validation/not-null-or-undefined.function";

export function maskSecretAttribute<TPayload extends string>(payload?: TPayload): Secret<TPayload> {
    if (isNullOrUndefined(payload)) return null;

    return "<secret>";
}

export function maskAttribute<TValue>(payload: {
    readonly value: TValue;
    readonly attributePath: string;
    readonly attributeMetadata?: AttributeMetadata<TValue>;
    readonly modelId: string;
    readonly modelType: string;
}): TValue {

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

export const maskModelConfig = {
    maskArray,
    maskModel,
    maskAttribute
};

export function maskModel<TModel>(
    payload: {
        readonly model: TModel;
        readonly attributePath?: string;
        readonly modelMetadata?: ModelMetadata<TModel>;
        readonly modelId: string;
        readonly modelType: string;
    },
    config = maskModelConfig
): TModel {

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
                r = config.maskArray({
                    array: model[attributeKey], attributePath, arrayMetadata: resolvedMetadata, modelId, modelType
                }, config);
            } else if (typeof model[attributeKey] === "object") {
                r = config.maskModel({
                    model: model[attributeKey], attributePath, modelMetadata: resolvedMetadata, modelId, modelType
                }, config);
            } else {
                r = config.maskAttribute({
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

export const maskArrayConfig = {
    maskArray,
    maskModel,
    maskAttribute
};

export function maskArray<TArray extends any[]>(
    payload: {
        readonly array: TArray;
        readonly attributePath?: string;
        readonly arrayMetadata?: ArrayMetadata<TArray[0]>;
        readonly modelId: string;
        readonly modelType: string;
    },
    config = maskArrayConfig
): TArray {

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
                r = config.maskArray({
                    array: item,
                    attributePath: childAttributePath,
                    arrayMetadata: metadata.item,
                    modelId, modelType
                }, config);
            } else if (typeof item === "object") {
                r = config.maskModel({
                    model: item,
                    attributePath: childAttributePath,
                    modelMetadata: metadata.item,
                    modelId, modelType
                }, config);
            } else {
                r = config.maskAttribute({
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
