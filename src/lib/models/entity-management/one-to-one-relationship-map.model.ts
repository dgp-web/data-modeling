import { EntityTypeMap } from "./entity-type-map.model";
import { OneToOneRelationship } from "./one-to-one-relationship.model";

export type OneToOneRelationshipMap<TFrom extends TEntityTypeMap[keyof TEntityTypeMap], TEntityTypeMap extends EntityTypeMap> = {
    readonly [K in keyof TEntityTypeMap as `to${Capitalize<string & K>}`]?: OneToOneRelationship<TEntityTypeMap, TFrom, TEntityTypeMap[K]>;
}
