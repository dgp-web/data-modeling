import { ArrayMetadata, AttributeMetadata, ModelMetadata, Secret } from "../../models";
import { isNullOrUndefined } from "../validation/is-null-or-undefined.function";

export function resolveMaskedAttribute<TValue>(payload: {
    readonly value: TValue extends string ? Secret<TValue> : TValue;
    readonly referenceValue?: TValue;
    readonly attributeMetadata?: AttributeMetadata<TValue>;
}): TValue {

    const value = payload.value;
    const referenceValue = payload.referenceValue;
    const attributeMetadata = payload.attributeMetadata;

    if (isNullOrUndefined(value)) return value as TValue;
    if (isNullOrUndefined(attributeMetadata)) return value as TValue;
    if (!attributeMetadata.isSecret) return value as TValue;
    if (value !== "<secret>") return value as TValue;
    if (value === "<secret>" && isNullOrUndefined(referenceValue)) return "<missing-secret>" as any;

    return referenceValue;

}

export const resolvedMaskedModelConfig = {
    resolveMaskedAttribute,
    resolveMaskedModel,
    resolveMaskedArray
};

export function resolveMaskedModel<TModel>(
    payload: {
        readonly model: TModel;
        readonly referenceModel?: TModel;
        readonly modelMetadata?: ModelMetadata<TModel>;
    },
    config = resolvedMaskedModelConfig
): TModel {

    const model = payload.model;
    const referenceModel = payload.referenceModel;
    const modelMetadata = payload.modelMetadata;

    if (isNullOrUndefined(model)) return model as TModel;
    if (isNullOrUndefined(referenceModel)) return model as TModel;
    if (isNullOrUndefined(modelMetadata)) return model as TModel;

    return Object.keys(model).reduce((result, attributeKey) => {

        const resolvedMetadata = modelMetadata.attributes ? modelMetadata.attributes[attributeKey] : undefined as { isRequired?: boolean; };
        let attributeValue;

        if (Array.isArray(model[attributeKey])) {
            attributeValue = config.resolveMaskedArray({
                array: model[attributeKey],
                referenceArray: referenceModel[attributeKey],
                arrayMetadata: resolvedMetadata
            }, config);
        } else if (typeof model[attributeKey] === "object") {
            attributeValue = config.resolveMaskedModel({
                model: model[attributeKey],
                referenceModel: referenceModel[attributeKey],
                modelMetadata: resolvedMetadata
            }, config);
        } else {
            attributeValue = config.resolveMaskedAttribute({
                value: model[attributeKey],
                referenceValue: referenceModel[attributeKey],
                attributeMetadata: resolvedMetadata
            });
        }

        result[attributeKey] = attributeValue;

        return result;

    }, {} as Partial<TModel>) as TModel;

}

export const resolvedMaskedArrayConfig = {
    resolveMaskedAttribute,
    resolveMaskedModel,
    resolveMaskedArray
};

export function resolveMaskedArray<TArray extends any[]>(
    payload: {
        readonly array: TArray;
        readonly referenceArray?: TArray;
        readonly arrayMetadata?: ArrayMetadata<TArray[0]>;
    },
    config = resolvedMaskedArrayConfig
): TArray {

    const array = payload.array;
    const referenceArray = payload.referenceArray;
    const arrayMetadata = payload.arrayMetadata;

    if (isNullOrUndefined(array)) return array as TArray;
    if (isNullOrUndefined(referenceArray)) return array as TArray;
    if (isNullOrUndefined(arrayMetadata)) return array as TArray;

    return array.map((item, index) => {
        if (Array.isArray(item)) {
            return config.resolveMaskedArray({
                array: item,
                referenceArray: referenceArray[index],
                arrayMetadata: arrayMetadata.item
            }, config);
        } else if (typeof item === "object") {
            return config.resolveMaskedModel({
                model: item,
                referenceModel: referenceArray[index],
                modelMetadata: arrayMetadata.item
            }, config);
        } else {
            return config.resolveMaskedAttribute({
                value: item,
                referenceValue: referenceArray[index],
                attributeMetadata: arrayMetadata.item
            });
        }
    }) as TArray;

}
