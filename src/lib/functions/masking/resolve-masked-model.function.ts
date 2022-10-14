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
    if (isNullOrUndefined(referenceValue)) return value as TValue;
    if (isNullOrUndefined(attributeMetadata)) return value as TValue;
    if (!attributeMetadata.isSecret) return value as TValue;
    if (value !== "<secret>") return value as TValue;

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
        readonly attributePath?: string;
        readonly modelMetadata?: ModelMetadata<TModel>;
    },
    config = resolvedMaskedModelConfig
): TModel {

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
        readonly attributePath?: string;
        readonly arrayMetadata?: ArrayMetadata<TArray[0]>;
    },
    config = resolvedMaskedArrayConfig
): TArray {

}
