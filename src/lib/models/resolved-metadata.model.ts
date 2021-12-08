import {AnyArray} from "./any-array.model";
import {ArrayMetadata} from "./array-metadata.model";
import {ModelMetadata} from "./model-metadata.model";
import {AttributeMetadata} from "./attribute-metadata.model";

export type ResolvedMetadata<T> = T extends AnyArray<(infer Item)>
    ? ArrayMetadata<Item>
    : T extends object
        ? ModelMetadata<T, any>
        : AttributeMetadata<T>;