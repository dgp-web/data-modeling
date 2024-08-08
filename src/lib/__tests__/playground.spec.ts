import { testModelMetadata } from "./attribute-metadata-map-test-case";
import { validateAttribute } from "../functions/validation/validate-attribute.function";

describe('playground', () => {

    it(`pattern`, () => {
        const result = testModelMetadata.label.pattern.test("asd");
        expect(result).toBe(true);
    });

    it(`pattern with validateAttribute`, () => {

        const result = validateAttribute({
            attributeMetadata: testModelMetadata.label,
            value: "asd",
            attributePath: "label",
            modelId: "myTestModel",
            modelType: "TestModel"
        });


        expect(result.isValid).toBe(true);


        const result1 = validateAttribute({
            attributeMetadata: testModelMetadata.label,
            value: "abc",
            attributePath: "label",
            modelId: "myTestModel",
            modelType: "TestModel"
        });


        expect(result1.isValid).toBe(false);

        console.log(result1.errors);
    });


});