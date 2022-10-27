import { ArrayMetadata, ModelMetadata } from "../../models";
import { isNullOrUndefined } from "../validation/is-null-or-undefined.function";

export const deleteMaskedAttributesFromModelConfig = {
    deleteSecretAttributesFromArray,
    deleteSecretAttributes
};

export function deleteSecretAttributes<TModel>(
    payload: {
        readonly model: TModel;
        readonly modelMetadata?: ModelMetadata<TModel>;
    },
    config = deleteMaskedAttributesFromModelConfig
): TModel {

    const model = payload.model;
    const metadata = payload.modelMetadata;

    if (isNullOrUndefined(model)) return model;
    if (isNullOrUndefined(metadata)) return model;

    return Object.keys(model).reduce((result, attributeKey) => {

        const resolvedMetadata = metadata.attributes ? metadata.attributes[attributeKey] : undefined as { isRequired?: boolean; isSecret?: boolean; };

        if (resolvedMetadata.isSecret) return result;

        let attributeValue;

        if (Array.isArray(model[attributeKey])) {
            attributeValue = config.deleteSecretAttributesFromArray({
                array: model[attributeKey], arrayMetadata: resolvedMetadata
            }, config);
        } else if (typeof model[attributeKey] === "object") {
            attributeValue = config.deleteSecretAttributes({
                model: model[attributeKey], modelMetadata: resolvedMetadata
            }, config);
        } else {
            attributeValue = model[attributeKey];
        }

        result[attributeKey] = attributeValue;

        return result;

    }, {} as Partial<TModel>) as TModel;
}

export const deleteMaskedAttributesFromArrayConfig = {
    deleteSecretAttributesFromArray,
    deleteSecretAttributes
};

export function deleteSecretAttributesFromArray<TArray extends any[]>(
    payload: {
        readonly array: TArray;
        readonly arrayMetadata?: ArrayMetadata<TArray[0]>;
    },
    config = deleteMaskedAttributesFromArrayConfig
): TArray {

    const value = payload.array;
    const metadata = payload.arrayMetadata;

    if (isNullOrUndefined(value)) return value;
    if (isNullOrUndefined(metadata)) return value;

    return value.map(item => {
        if (Array.isArray(item)) {
            return config.deleteSecretAttributesFromArray({
                array: item,
                arrayMetadata: metadata.item
            }, config);
        } else if (typeof item === "object") {
            return config.deleteSecretAttributes({
                model: item,
                modelMetadata: metadata.item
            }, config);
        } else {
            return item
        }
    }) as TArray;

}
