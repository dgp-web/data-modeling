import { EntityTypeMap } from "./entity-type-map.model";
import { EntityStateMap } from "./entity-state-map.model";
import { RelatedEntities } from "./related-entities.model";

export type Relationship<TAttribute, TEntityTypeMap extends EntityTypeMap> = (attributeValue: TAttribute, state: EntityStateMap<TEntityTypeMap>) => RelatedEntities<TAttribute, TEntityTypeMap>;
