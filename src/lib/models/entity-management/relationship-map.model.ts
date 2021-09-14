import { EntityTypeMap } from "./entity-type-map.model";
import { OneToOneRelationshipMap } from "./one-to-one-relationship-map.model";
import { OneToManyRelationshipMap } from "./one-to-many-relationship-map.model";

export type RelationshipMap<TFrom extends TEntityTypeMap[keyof TEntityTypeMap], TEntityTypeMap extends EntityTypeMap> =
    OneToOneRelationshipMap<TFrom, TEntityTypeMap> & OneToManyRelationshipMap<TFrom, TEntityTypeMap>;
