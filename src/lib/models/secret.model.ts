export type Secret<T extends string, TSecretIndicator extends string = "<secret>", TMissingSecretIndicator extends string = "<missing-secret>"> =
    T
    | TSecretIndicator
    | TMissingSecretIndicator;