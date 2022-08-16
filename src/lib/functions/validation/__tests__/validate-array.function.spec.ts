import { createMissingAttributeValueError } from "../create-missing-attribute-value-error.function";
import { createMinViolationError } from "../create-min-violation-error.function";
import { createMaxViolationError } from "../create-max-violation-error.function";
import { ArrayMetadata, ModelValidationResult } from "../../../models";
import { validateArray, validateArrayConfig } from "../validate-model.function";

describe("validateArray", () => {

    const array = [];
    const attributePath = "key";
    const modelId = "modelId";
    const modelType = "modelType";

    const validResult: ModelValidationResult = {isValid: true};

    it(`should return a valid result if no metadata are passed.`, () => {
        const result = validateArray({array, attributePath, modelId, modelType});
        expect(result).toEqual(validResult);
    });

    /**
     * General
     */

    it(`should return an error if no model is passed but the attribute is required.`, () => {
        const nullValue = null;

        const result = validateArray({
            array: nullValue, attributePath, arrayMetadata: {isRequired: true}, modelId, modelType
        });

        const expectedError = createMissingAttributeValueError({value: nullValue, attributePath, modelId, modelType});

        expect(result.isValid).toBeFalsy();
        expect(result.errors).toContainEqual(expectedError);
    });

    it(`should return an error if an array model's length is below the allowed minimum.`, () => {
        const arrayValue = [{}, {}, {}, {}];
        const min = 5;

        const result = validateArray({
            array: arrayValue, attributePath, arrayMetadata: {min}, modelId, modelType
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

    it(`should return an error if an array model's length is above the allowed maximum.`, () => {
        const arrayValue = [{}, {}, {}, {}];
        const max = 3;

        const result = validateArray({
            array: arrayValue, attributePath, arrayMetadata: {max}, modelId, modelType
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

    /**
     * item
     */

    it(`should call validateArray for array items`, () => {
        spyOn(validateArrayConfig, "validateArray").and.callThrough();

        const item = {label: "abcd"};
        const arrayValue = [[item]];


        const arrayMetadata: ArrayMetadata<typeof arrayValue[0]> = {
            item: {
                item: {
                    attributes: {
                        label: {max: 4}
                    }
                }
            }
        };

        validateArray({
            array: arrayValue, attributePath, arrayMetadata, modelId, modelType
        });

        expect(validateArrayConfig.validateArray).toHaveBeenCalledWith({
            array: arrayValue[0],
            attributePath: attributePath + ".0",
            arrayMetadata: arrayMetadata.item, modelId, modelType
        }, validateArrayConfig);
    });

    it(`should call validateModel for object items`, () => {
        spyOn(validateArrayConfig, "validateModel").and.callThrough();

        const item = {label: "abcd"};
        const arrayValue = [item];

        const arrayMetadata: ArrayMetadata<typeof arrayValue[0]> = {
            item: {
                attributes: {
                    label: {max: 4}
                }
            }
        };

        validateArray({
            array: arrayValue, attributePath, arrayMetadata, modelId, modelType
        });

        expect(validateArrayConfig.validateModel).toHaveBeenCalledWith({
            model: item,
            attributePath: attributePath + ".0",
            modelMetadata: arrayMetadata.item, modelId, modelType
        }, validateArrayConfig);
    });

    it(`should call validateAttribute for attribute items`, () => {
        spyOn(validateArrayConfig, "validateAttribute").and.callThrough();

        const item = "abcd";
        const arrayValue = [item];
        const arrayMetadata: ArrayMetadata<typeof item> = {item: {max: 4}};

        validateArray({array: arrayValue, attributePath, arrayMetadata, modelId, modelType});

        expect(validateArrayConfig.validateAttribute).toHaveBeenCalledWith({
            value: item,
            attributePath: attributePath + ".0",
            attributeMetadata: arrayMetadata.item, modelId, modelType
        });
    });

});
