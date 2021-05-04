import { ModelMetadata } from "../../models";
import { User } from "../models/user.model";
import { UserEntities } from "../models/user-entities.model";

export const testUserMetadata: ModelMetadata<User, UserEntities> = {
    id: x => x.userId,
    attributes: {},
    relationships: {
        toPets: (entity, state) => entity.petIds.map(petId => state.pet.entities[petId]),
        toLocation: (entity, state) => state.location.entities[entity.locationId]
    }
}
