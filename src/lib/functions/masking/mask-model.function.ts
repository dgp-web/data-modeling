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
        readonly modelMetadata?: ModelMetadata<TModel>;
    },
    config = maskModelConfig
): TModel {

    const model = payload.model;
    const metadata = payload.modelMetadata;

    if (isNullOrUndefined(model)) return model;
    if (isNullOrUndefined(metadata)) return model;

    return Object.keys(model).reduce((result, attributeKey) => {

        const resolvedMetadata = metadata.attributes ? metadata.attributes[attributeKey] : undefined as { isRequired?: boolean; };
        let attributeValue;

        if (Array.isArray(model[attributeKey])) {
            attributeValue = config.maskArray({
                array: model[attributeKey], arrayMetadata: resolvedMetadata
            }, config);
        } else if (typeof model[attributeKey] === "object") {
            attributeValue = config.maskModel({
                model: model[attributeKey], modelMetadata: resolvedMetadata
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
        readonly arrayMetadata?: ArrayMetadata<TArray[0]>;
    },
    config = maskArrayConfig
): TArray {

    const value = payload.array;
    const metadata = payload.arrayMetadata;

    if (isNullOrUndefined(value)) return value;
    if (isNullOrUndefined(metadata)) return value;

    return value.map(item => {
        if (Array.isArray(item)) {
            return config.maskArray({
                array: item,
                arrayMetadata: metadata.item
            }, config);
        } else if (typeof item === "object") {
            return config.maskModel({
                model: item,
                modelMetadata: metadata.item
            }, config);
        } else {
            return config.maskAttribute({
                value: item,
                attributeMetadata: metadata.item
            });
        }
    }) as TArray;

}
