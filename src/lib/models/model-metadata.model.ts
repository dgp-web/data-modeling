import {EntityTypeMap, IdPropertyAccessor, RelationshipMap} from "./entity-management";
import {AttributeMetadataMap} from "./attribute-metadata-map.model";
import {KVS} from "./key-value-store.model";

export interface ModelMetadata<T extends TEntityTypeMap[keyof TEntityTypeMap], TEntityTypeMap extends EntityTypeMap = KVS<T>> {
    readonly id?: IdPropertyAccessor<T>;
    readonly attributes?: AttributeMetadataMap<T>;
    readonly relationships?: RelationshipMap<T, TEntityTypeMap>;
    readonly defaultValue?: T;
    readonly label?: string;
    readonly hint?: string;
    readonly description?: string;
    readonly icon?: string;
    readonly isRequired?: boolean;
}
