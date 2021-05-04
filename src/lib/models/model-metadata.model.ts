import { AttributeMetadata } from "./attribute-metadata.model";
import { EntityTypeMap } from "./entities/entity-type-map.model";
import { RelationshipMap } from "./entities/relationship-map.model";


export type GetIdSignature<TModel> = (x: TModel) => string;
export type IdPropertyAccessor<TModel> = string | GetIdSignature<TModel>;

export type AttributeMetadataMap<T, TEntityTypeMap extends EntityTypeMap> = {
    [K in keyof T]?: AttributeMetadata<T[K], T[K], TEntityTypeMap>
};

export interface ModelMetadata<T extends TEntityTypeMap[keyof TEntityTypeMap], TEntityTypeMap extends EntityTypeMap> {
    readonly getKey?: IdPropertyAccessor<T>;
    readonly attributes?: AttributeMetadataMap<T, TEntityTypeMap>;
    readonly relationships?: RelationshipMap<T, TEntityTypeMap>;
}
