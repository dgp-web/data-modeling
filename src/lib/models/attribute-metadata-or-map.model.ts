import {AttributeMetadata} from "./attribute-metadata.model";
import {ModelMetadata} from "./model-metadata.model";

export type AttributeOrModelMetadata<TModel, TKey extends keyof TModel> = TModel[TKey] extends (infer E)[] ?
    ModelMetadata<E, any>
    : TModel[TKey] extends object
        ? ModelMetadata<TModel[TKey], any>
        : AttributeMetadata<TModel[TKey]>;

export type AttributeOrModelMetadataMap<TModel> = {
    [K in keyof TModel]: AttributeOrModelMetadata<TModel, K>;
}

export interface Nested {
    readonly sub: number;
}

export interface TestModel {
    readonly label: string;
    readonly nested: Nested;
    readonly nestedArray: Nested[];
}

const testModelMetadata: AttributeOrModelMetadataMap<TestModel> = {
    label: {},
    nested: {},
    nestedArray: {
        attributes: {}
    }
}
