import { EntityTypeMap } from "./entity-management";
import { AttributeMetadata } from "./attribute-metadata.model";

export type AttributeMetadataMap<T, TEntityTypeMap extends EntityTypeMap> = {
    [K in keyof T]?: AttributeMetadata<T[K], T[K]>
};
