import { AttributeMetadata, Secret } from "../../models";
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

export function resolveMaskedModel() {

}

export function resolveMaskedArray() {

}
