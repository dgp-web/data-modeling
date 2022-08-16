export interface ModelValidationError {
    readonly title: string;
    readonly message: string;
    readonly modelId: string;
    readonly modelType: string;
    readonly attributePath: string;
}

