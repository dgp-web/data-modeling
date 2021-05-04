import { EntityTypeMap, IdPropertyAccessor, RelationshipMap } from "./entity-management";
import { AttributeMetadataMap } from "./attribute-metadata-map.model";

export interface ModelMetadata<T extends TEntityTypeMap[keyof TEntityTypeMap], TEntityTypeMap extends EntityTypeMap> {
    readonly id?: IdPropertyAccessor<T>;
    readonly attributes?: AttributeMetadataMap<T, TEntityTypeMap>;
    readonly relationships?: RelationshipMap<T, TEntityTypeMap>;
}
