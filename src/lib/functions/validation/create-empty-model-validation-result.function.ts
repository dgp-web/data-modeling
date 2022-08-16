import {ModelValidationResult, Mutable} from "../../models";

export function createEmptyModelValidationResult(): Mutable<ModelValidationResult> {
    return {
        isValid: true,
        errors: []
    };
}