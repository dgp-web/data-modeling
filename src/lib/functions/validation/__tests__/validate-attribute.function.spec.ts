import { createMissingAttributeValueError } from "../create-missing-attribute-value-error.function";
import { createMinViolationError } from "../create-min-violation-error.function";
import { createMaxViolationError } from "../create-max-violation-error.function";
import { ModelValidationError, ModelValidationResult, ValidateAttribute } from "../../../models";
import { validateAttribute } from "../validate-model.function";
import { createUnexpectedValueTypeError } from "../create-unexpected-value-type-error.function";

describe("validateAttribute", () => {

    const value = "Test";
    const attributePath = "key";
    const modelId = "modelId";
    const modelType = "modelType";

    const validResult: ModelValidationResult = {isValid: true};

    it(`should return a valid result if no metadata are passed.`, () => {
        const result = validateAttribute({value, attributePath, modelId, modelType});
        expect(result).toEqual(validResult);
    });

    it(`should return an error if no model is passed but the attribute is required.`, () => {
        const nullValue = null;

        const result = validateAttribute({
            value: nullValue, attributePath, attributeMetadata: {isRequired: true}, modelId, modelType
        });

        const expectedError = createMissingAttributeValueError({value: nullValue, attributePath, modelId, modelType});

        expect(result.isValid).toBeFalsy();
        expect(result.errors).toContainEqual(expectedError);
    });

    /**
     * min
     */

    it(`should return an error if a number model's value is below the allowed minimum.`, () => {
        const numberValue = 4;
        const min = 5;

        const result = validateAttribute({
            value: numberValue, attributePath, attributeMetadata: {min}, modelId, modelType
        });

        const expectedError = createMinViolationError({value: numberValue, attributePath, min, modelId, modelType});

        expect(result.isValid).toBeFalsy();
        expect(result.errors).toContainEqual(expectedError);
    });

    it(`should return an error if a string model's length is below the allowed minimum.`, () => {
        const stringValue = "abcd";
        const min = 5;

        const result = validateAttribute({
            value: stringValue, attributePath, attributeMetadata: {min}, modelId, modelType
        });

        const expectedError = createMinViolationError({
            value: stringValue.length,
            attributePath,
            min,
            modelId,
            modelType
        });

        expect(result.isValid).toBeFalsy();
        expect(result.errors).toContainEqual(expectedError);
    });

    it(`should return an error if an array model's length is below the allowed minimum.`, () => {
        const arrayValue = [{}, {}, {}, {}];
        const min = 5;

        const result = validateAttribute({
            value: arrayValue, attributePath, attributeMetadata: {min}, modelId, modelType
        });

        const expectedError = createMinViolationError({
            value: arrayValue.length,
            attributePath,
            min,
            modelId,
            modelType
        });

        expect(result.isValid).toBeFalsy();
        expect(result.errors).toContainEqual(expectedError);
    });

    /**
     * max
     */

    it(`should return an error if a number model's value is above the allowed maximum.`, () => {
        const numberValue = 4;
        const max = 3;

        const result = validateAttribute({
            value: numberValue, attributePath, attributeMetadata: {max}, modelId, modelType
        });

        const expectedError = createMaxViolationError({value: numberValue, attributePath, max, modelId, modelType});

        expect(result.isValid).toBeFalsy();
        expect(result.errors).toContainEqual(expectedError);
    });

    it(`should return an error if a string model's length is above the allowed maximum.`, () => {
        const stringValue = "abcd";
        const max = 3;

        const result = validateAttribute({
            value: stringValue, attributePath, attributeMetadata: {max}, modelId, modelType
        });

        const expectedError = createMaxViolationError({
            value: stringValue.length,
            attributePath,
            max,
            modelId,
            modelType
        });

        expect(result.isValid).toBeFalsy();
        expect(result.errors).toContainEqual(expectedError);
    });

    it(`should return an error if an array model's length is above the allowed maximum.`, () => {
        const arrayValue = [{}, {}, {}, {}];
        const max = 3;

        const result = validateAttribute({
            value: arrayValue, attributePath, attributeMetadata: {max}, modelId, modelType
        });

        const expectedError = createMaxViolationError({
            value: arrayValue.length,
            attributePath,
            max,
            modelId,
            modelType
        });

        expect(result.isValid).toBeFalsy();
        expect(result.errors).toContainEqual(expectedError);
    });

    it(`should return an error if an attribute's expected type is "string" but the actual type is not.`, () => {
        const value = 1;

        const result = validateAttribute({
            value: value, attributePath, attributeMetadata: {type: "string"}, modelId, modelType
        });

        const expectedError = createUnexpectedValueTypeError({
            actualType: typeof value,
            attributePath,
            expectedType: "string",
            modelId,
            modelType
        });

        expect(result.isValid).toBeFalsy();
        expect(result.errors).toContainEqual(expectedError);
    });

    it(`should return an error if an attribute's expected type is "number" but the actual type is not.`, () => {
        const value = "";

        const result = validateAttribute({
            value: value, attributePath, attributeMetadata: {type: "number"}, modelId, modelType
        });

        const expectedError = createUnexpectedValueTypeError({
            actualType: typeof value,
            attributePath,
            expectedType: "number",
            modelId,
            modelType
        });

        expect(result.isValid).toBeFalsy();
        expect(result.errors).toContainEqual(expectedError);
    });

    it(`should return an error if an attribute's expected type is "integer" but the actual type is not.`, () => {
        const value = 1.1;

        const result = validateAttribute({
            value: value, attributePath, attributeMetadata: {type: "integer"}, modelId, modelType
        });

        const expectedError = createUnexpectedValueTypeError({
            actualType: typeof value,
            attributePath,
            expectedType: "integer",
            modelId,
            modelType
        });

        expect(result.isValid).toBeFalsy();
        expect(result.errors).toContainEqual(expectedError);
    });

    it(`should return an error if an attribute's expected type is "boolean" but the actual type is not.`, () => {
        const value = 1;

        const result = validateAttribute({
            value: value, attributePath, attributeMetadata: {type: "boolean"}, modelId, modelType
        });

        const expectedError = createUnexpectedValueTypeError({
            actualType: typeof value,
            attributePath,
            expectedType: "boolean",
            modelId,
            modelType
        });

        expect(result.isValid).toBeFalsy();
        expect(result.errors).toContainEqual(expectedError);
    });

    it(`should consider additional validation.`, () => {
        const arrayValue = ["one", "one"];
        const expectedError: ModelValidationError = {
            attributePath,
            modelId,
            modelType,
            title: "Items not unique",
            message: "All items must be unique, got: " + JSON.stringify(arrayValue)
        };

        const additionalValidation: ValidateAttribute<readonly string[]> = payload => {

            if ((new Set(payload.value)).size !== payload.value.length) {
                return {
                    isValid: false,
                    errors: [expectedError]
                }
            } else {
                return {
                    isValid: true
                };
            }
        };

        const result = validateAttribute({
            value: arrayValue, attributePath, attributeMetadata: {additionalValidation}, modelId, modelType
        });
        expect(result.isValid).toBeFalsy();
        expect(result.errors).toContainEqual(expectedError);
    });


});
