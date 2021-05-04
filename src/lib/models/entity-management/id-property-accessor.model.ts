import { GetIdSignature } from "./get-id-signature.model";

export type IdPropertyAccessor<TModel> = string | GetIdSignature<TModel>;
