import {validateAttribute} from "../validate-attribute.function";
import {createMissingAttributeValueError} from "../create-missing-attribute-value-error.function";
import {createMinViolationError} from "../create-min-violation-error.function";
import {createMaxViolationError} from "../create-max-violation-error.function";
import {ModelValidationResult} from "../../../models";

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


});
