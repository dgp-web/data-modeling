import { EntityTypeMap } from "./entity-type-map.model";
import { EntityState } from "./entity-state.model";

export type EntityStateMap<TEntityTypeMap extends EntityTypeMap> = {
    readonly [K in keyof TEntityTypeMap]: EntityState<TEntityTypeMap[K]>;
}
