import { Many } from "../../models";

export interface User {
    readonly userId: string;
    readonly petIds: Many<string>;
    readonly locationId: string;
    readonly label: string;
}
