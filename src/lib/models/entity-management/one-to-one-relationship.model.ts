import { EntityTypeMap } from "./entity-type-map.model";
import { EntityStateMap } from "./entity-state-map.model";

export type OneToOneRelationship<TEntityTypeMap extends EntityTypeMap, TEntity extends TEntityTypeMap[keyof TEntityTypeMap], TTargetEntity extends TEntityTypeMap[keyof TEntityTypeMap]>
    = (entity: TEntity, state: EntityStateMap<TEntityTypeMap>) => TTargetEntity;
