import { Many } from "./many.model";
import { EntityTypeMap } from "./entities/entity-type-map.model";
import { ModelMetadata } from "./model-metadata.model";

export type GetIdSignature<TModel> = (x: TModel) => string;
export type IdPropertyAccessor<TModel> = string | GetIdSignature<TModel>;


export interface AttributeMetadata<T = number, TScale = T, TEntityTypeMap extends EntityTypeMap = EntityTypeMap> {
    readonly label?: string;
    readonly hint?: string;
    readonly description?: string;
    readonly icon?: string;
    readonly defaultValue?: T;
    readonly min?: TScale;
    readonly max?: TScale;
    readonly step?: TScale;
}

export interface Pet {
    readonly petId: string;
}

export interface PetKey {
    readonly petId: string;
}

export interface User {
    readonly userId: string;
    readonly petIds: Many<string>;
    readonly petKeys: Many<PetKey>;
    readonly locationId: string;
    readonly label: string;
}

export interface Location {
    readonly locationId: string;
    readonly label: string;
}

export interface UserEntities {
    readonly user: User;
    readonly pet: Pet;
    readonly location: Location;
}

const userMetadata: ModelMetadata<User, UserEntities> = {
    key: x => x.userId,
    attributes: {},
    relationships: {
        getPets: (entity, state) => entity.petIds.map(petId => state.pet.entities[petId]),
        getLocation: (entity, state) => state.location.entities[entity.locationId],
    }
}


const result = userMetadata.relationships.getPet(null, null);
