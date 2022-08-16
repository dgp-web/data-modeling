import {validateModel, validateModelConfig} from "../validate-model.function";
import {createMissingAttributeValueError} from "../create-missing-attribute-value-error.function";
import {ModelMetadata, ModelValidationResult} from "../../../models";

describe("validateModel", () => {

    const attributePath = "key";
    const validResult: ModelValidationResult = {isValid: true};
    const modelId = "modelId";
    const modelType = "modelType";

    it(`should return a valid result if no metadata are passed`, () => {
        const model = {};
        const result = validateModel({model, attributePath, modelId, modelType});
        expect(result).toEqual(validResult);
    });

    it(`should return a valid result if the passed metadata have no attributes`, () => {
        const model = {};
        const result = validateModel({model, attributePath, modelMetadata: {}, modelId, modelType});
        expect(result).toEqual(validResult);
    });

    /**
     * General
     */

    it(`should return an error if no model is passed but it is required.`, () => {
        const nullValue = null;

        const result = validateModel({
            model: nullValue, attributePath, modelMetadata: {isRequired: true}, modelId, modelType
        });

        const expectedError = createMissingAttributeValueError({value: nullValue, attributePath, modelId, modelType});

        expect(result.isValid).toBeFalsy();
        expect(result.errors).toContainEqual(expectedError);
    });

    it(`should call validateArray for array attributes`, () => {
        spyOn(validateModelConfig, "validateArray").and.callThrough();

        const model = {nested: []};
        const modelMetadata: ModelMetadata<typeof model, any> = {
            attributes: {nested: {}}
        };

        validateModel({model, attributePath, modelMetadata, modelId, modelType});

        expect(validateModelConfig.validateArray).toHaveBeenCalledWith({
            array: model.nested,
            attributePath: attributePath + ".nested",
            arrayMetadata: modelMetadata.attributes.nested, modelId, modelType
        }, validateModelConfig);
    });

    it(`should call validateModel for model attributes`, () => {
        spyOn(validateModelConfig, "validateModel").and.callThrough();

        const model = {nested: {label: "abcd"}};
        const modelMetadata: ModelMetadata<typeof model, any> = {
            attributes: {nested: {}}
        };

        validateModel({model, attributePath, modelMetadata, modelId, modelType});

        expect(validateModelConfig.validateModel).toHaveBeenCalledWith({
            model: model.nested,
            attributePath: attributePath + ".nested",
            modelMetadata: modelMetadata.attributes.nested, modelId, modelType
        }, validateModelConfig);
    });

    it(`should call validateAttribute for primitive attributes`, () => {
        spyOn(validateModelConfig, "validateAttribute").and.callThrough();

        const model = {label: "abcd"};
        const modelMetadata: ModelMetadata<typeof model, any> = {
            attributes: {label: {}}
        };

        validateModel({model, attributePath, modelMetadata, modelId, modelType});

        expect(validateModelConfig.validateAttribute).toHaveBeenCalledWith({
            value: model.label,
            attributePath: attributePath + ".label",
            attributeMetadata: modelMetadata.attributes.label, modelId, modelType
        });
    });

});
