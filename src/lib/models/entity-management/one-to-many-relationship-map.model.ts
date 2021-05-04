import { EntityTypeMap } from "./entity-type-map.model";
import { OneToManyRelationship } from "./one-to-many-relationship.model";

export type OneToManyRelationshipMap<TFrom extends TEntityTypeMap[keyof TEntityTypeMap], TEntityTypeMap extends EntityTypeMap> = {
    readonly [K in keyof TEntityTypeMap as `to${Capitalize<string & K>}s`]?: OneToManyRelationship<TEntityTypeMap, TFrom, TEntityTypeMap[K]>;
}
