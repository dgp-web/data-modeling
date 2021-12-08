import {ResolvedMetadata} from "./resolved-metadata.model";

export type AttributeMetadataMap<TModel> = {
    readonly [TKey in keyof TModel]?: ResolvedMetadata<TModel[TKey]>;
};

