import { User } from "./user.model";
import { Pet } from "./pet.model";
import { Location } from "./location.model";

export interface UserEntities {
    readonly user: User;
    readonly pet: Pet;
    readonly location: Location;
}
