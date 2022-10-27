import { ArrayMetadata, ModelMetadata } from "../../models";
import { isNullOrUndefined } from "../validation/is-null-or-undefined.function";

export const deleteSecretAttributesConfig = {
    deleteMaskedSecretAttributesFromArray,
    deleteMaskedSecretAttributes
};

export function deleteMaskedSecretAttributes<TModel>(
    payload: {
        readonly model: TModel;
        readonly modelMetadata?: ModelMetadata<TModel>;
    },
    config = deleteSecretAttributesConfig
): TModel {

    const model = payload.model;
    const metadata = payload.modelMetadata;

    if (isNullOrUndefined(model)) return model;
    if (isNullOrUndefined(metadata)) return model;

    return Object.keys(model).reduce((result, attributeKey) => {

        const resolvedMetadata = metadata.attributes ? metadata.attributes[attributeKey] : undefined as { isRequired?: boolean; isSecret?: boolean; };

        let attributeValue = model[attributeKey];

        if (resolvedMetadata && resolvedMetadata.isSecret && (attributeValue === "<secret>" || attributeValue === "<missing-secret>")) return result;

        if (Array.isArray(model[attributeKey])) {
            attributeValue = config.deleteMaskedSecretAttributesFromArray({
                array: model[attributeKey], arrayMetadata: resolvedMetadata
            }, config);
        } else if (typeof model[attributeKey] === "object") {
            attributeValue = config.deleteMaskedSecretAttributes({
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
    deleteMaskedSecretAttributesFromArray,
    deleteMaskedSecretAttributes
};

export function deleteMaskedSecretAttributesFromArray<TArray extends any[]>(
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
            return config.deleteMaskedSecretAttributesFromArray({
                array: item,
                arrayMetadata: metadata.item
            }, config);
        } else if (typeof item === "object") {
            return config.deleteMaskedSecretAttributes({
                model: item,
                modelMetadata: metadata.item
            }, config);
        } else {
            return item
        }
    }) as TArray;

}
