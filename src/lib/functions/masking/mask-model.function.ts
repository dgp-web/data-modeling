import { ArrayMetadata, AttributeMetadata, ModelMetadata } from "../../models";
import { isNullOrUndefined } from "../validation/is-null-or-undefined.function";
import { maskSecretAttribute } from "./mask-secret-attribute.function";

export function maskAttribute<TValue>(payload: {
    readonly value: TValue;
    readonly attributeMetadata?: AttributeMetadata<TValue>;
}): TValue {

    const value = payload.value;
    const metadata = payload.attributeMetadata;

    if (isNullOrUndefined(value)) return value;
    if (isNullOrUndefined(metadata)) return value;

    if (metadata.isSecret && typeof value === "string") return maskSecretAttribute(value) as TValue;
    return value;

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

    if (isNullOrUndefined(model)) return model;
    if (isNullOrUndefined(metadata)) return model;

    return Object.keys(model).reduce((result, attributeKey) => {

        const attributePath = rootAttributePath ? rootAttributePath + "." + attributeKey : attributeKey;
        const resolvedMetadata = metadata.attributes[attributeKey] as { isRequired?: boolean; };
        let attributeValue;

        if (Array.isArray(model[attributeKey])) {
            attributeValue = config.maskArray({
                array: model[attributeKey], attributePath, arrayMetadata: resolvedMetadata, modelId, modelType
            }, config);
        } else if (typeof model[attributeKey] === "object") {
            attributeValue = config.maskModel({
                model: model[attributeKey], attributePath, modelMetadata: resolvedMetadata, modelId, modelType
            }, config);
        } else {
            attributeValue = config.maskAttribute({
                value: model[attributeKey], attributeMetadata: resolvedMetadata
            });
        }

        result[attributeKey] = attributeValue;

        return result;

    }, {} as Partial<TModel>) as TModel;
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

    if (isNullOrUndefined(value)) return value;
    if (isNullOrUndefined(metadata)) return value;

    return value.map((item, index) => {
        const childAttributePath = attributePath + "." + index;

        if (Array.isArray(item)) {
            return config.maskArray({
                array: item,
                attributePath: childAttributePath,
                arrayMetadata: metadata.item,
                modelId, modelType
            }, config);
        } else if (typeof item === "object") {
            return config.maskModel({
                model: item,
                attributePath: childAttributePath,
                modelMetadata: metadata.item,
                modelId, modelType
            }, config);
        } else {
            return config.maskAttribute({
                value: item,
                attributeMetadata: metadata.item
            });
        }
    }) as TArray;

}
