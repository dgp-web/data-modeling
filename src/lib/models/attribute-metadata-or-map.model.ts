import {AttributeMetadata} from "./attribute-metadata.model";
import {ModelMetadata} from "./model-metadata.model";
import {Many} from "./many.model";

export type ArrayType<T> = T[] | ReadonlyArray<T> | Many<T>;
export type Flatten<Type> = Type extends Array<infer Item> ? Flatten<Item> : Type;

export interface FlattenTest {
    readonly one: string[];
    readonly two: string[][];
    readonly three: string[][][];
}

const test: FlattenTest = {
    one: [], two: [], three: []
};

export type asd = Flatten<string[][][]>;

export type AttributeOrModelMetadata<TModel, TKey extends keyof TModel> = TModel[TKey] extends ArrayType<(infer E)> ? // array or other
    ModelMetadata<E, any> // TODO: We are finished here because we could encounter nested arrays
    : TModel[TKey] extends object // object or primitive attribute
        ? ModelMetadata<TModel[TKey], any>
        : AttributeMetadata<TModel[TKey]>;
/*
export type AttributeOrModelMetadataMap<TModel> = {

    readonly [TKey in keyof TModel]: TModel[TKey] extends ArrayType<(infer E)> ? // array or other
        ModelMetadata<E, any> // TODO: We are finished here because we could encounter nested arrays
        : TModel[TKey] extends object // object or primitive attribute
            ? ModelMetadata<TModel[TKey], any>
            : AttributeMetadata<TModel[TKey]>;

}*/

export type AttributeOrModelMetadataMap<TModel> = {

    readonly [TKey in keyof TModel]: TModel[TKey] extends ArrayType<(infer E)> ? // array or other
        Flatten<E> extends object
            ? ModelMetadata<Flatten<E>, any>
            : AttributeMetadata<Flatten<E>>// TODO: We are finished here because we could encounter nested arrays -->
        : TModel[TKey] extends object // object or primitive attribute
            ? ModelMetadata<TModel[TKey], any>
            : AttributeMetadata<TModel[TKey]>;

}


export interface Nested {
    readonly sub: number;
}

export interface TestModel {
    readonly label: string;
    readonly nested: Nested;
    readonly nestedArray: Array<Nested>;
    readonly stringArray: string[];
}

const testModelMetadata: AttributeOrModelMetadataMap<TestModel> = {
    label: {

    },
    nested: {

    },
    nestedArray: {
        attributes: {
            sub: {}
        }
    },
    stringArray: {

    }
}
