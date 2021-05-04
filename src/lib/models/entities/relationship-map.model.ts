import { EntityTypeMap } from "./entity-type-map.model";
import { OneToOneRelationship } from "./one-to-one-relationship.model";
import { OneToManyRelationship } from "./one-to-many-relationship.model";

export type OneToOneRelationships<TFrom extends TEntityTypeMap[keyof TEntityTypeMap], TEntityTypeMap extends EntityTypeMap> = {
    readonly [K in keyof TEntityTypeMap as `get${Capitalize<string & K>}`]?: OneToOneRelationship<TEntityTypeMap, TFrom, TEntityTypeMap[K]>;
}

export type OneToManyRelationships<TFrom extends TEntityTypeMap[keyof TEntityTypeMap], TEntityTypeMap extends EntityTypeMap> = {
    readonly [K in keyof TEntityTypeMap as `get${Capitalize<string & K>}s`]?: OneToManyRelationship<TEntityTypeMap, TFrom, TEntityTypeMap[K]>;
}

export type RelationshipMap<TFrom extends TEntityTypeMap[keyof TEntityTypeMap], TEntityTypeMap extends EntityTypeMap> =
    OneToOneRelationships<TFrom, TEntityTypeMap> & OneToManyRelationships<TFrom, TEntityTypeMap>;
