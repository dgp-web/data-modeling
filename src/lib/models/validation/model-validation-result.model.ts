import { ModelValidationError } from "./model-validation-error.model";

export interface ModelValidationResult {
    readonly isValid: boolean;
    readonly errors?: readonly ModelValidationError[];
}