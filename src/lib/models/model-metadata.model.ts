import { EntityTypeMap, IdPropertyAccessor, RelationshipMap } from "./entity-management";
import { AttributeMetadataMap } from "./attribute-metadata-map.model";
import { KVS } from "./key-value-store.model";
import { AttributeMetadata } from "./attribute-metadata.model";

export interface ModelMetadata<T extends TEntityTypeMap[keyof TEntityTypeMap], TEntityTypeMap extends EntityTypeMap = KVS<T>> extends AttributeMetadata<T, T> {
    readonly id?: IdPropertyAccessor<T>;
    readonly attributes?: AttributeMetadataMap<T>;
    readonly relationships?: RelationshipMap<T, TEntityTypeMap>;
}
