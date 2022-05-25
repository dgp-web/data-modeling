/**
 * source: https://github.com/date-fns/date-fns/issues/1944
 */
export type ReadonlyDate = Readonly<Omit<Date,
    | "setTime"
    | "setMilliseconds"
    | "setUTCMilliseconds"
    | "setSeconds"
    | "setUTCSeconds"
    | "setMinutes"
    | "setUTCMinutes"
    | "setHours"
    | "setUTCHours"
    | "setDate"
    | "setUTCDate"
    | "setMonth"
    | "setUTCMonth"
    | "setFullYear"
    | "setUTCFullYear">>;