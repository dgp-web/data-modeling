import { Secret } from "../../models";
import { isNullOrUndefined } from "../validation/is-null-or-undefined.function";

export function maskSecretAttribute<TPayload extends string>(payload?: TPayload): Secret<TPayload> {
    if (isNullOrUndefined(payload)) return null;

    return "<secret>";
}
