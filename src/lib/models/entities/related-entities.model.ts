import { EntityTypeMap } from "./entity-type-map.model";
import { Many } from "../many.model";

export type RelatedEntities<Attr, TEntityTypeMap extends EntityTypeMap> = Attr extends Many<any> ? TEntityTypeMap[keyof TEntityTypeMap][] : TEntityTypeMap[keyof TEntityTypeMap];
