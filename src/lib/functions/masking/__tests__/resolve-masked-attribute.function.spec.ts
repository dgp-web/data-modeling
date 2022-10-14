import { resolveMaskedAttribute } from "../resolve-masked-model.function";
import { AttributeMetadata } from "../../../models";

describe("resolveMaskedAttribute", () => {

    const value = "test";

    it("should return a null or undefined value", () => {
        const result = resolveMaskedAttribute({
            value: null
        });
        expect(result).toBeNull();
    });

    it("should return the passed value if there's no referenceValue", () => {
        const result = resolveMaskedAttribute({
            value,
            referenceValue: null
        });
        expect(result).toBe(value);
    });

    it("should return the passed value if there's no attributeMetadata", () => {
        const result = resolveMaskedAttribute({
            value,
            referenceValue: value
        });
        expect(result).toBe(value);
    });

    it("should return the passed value if attributeMetadata do not declare it as secret", () => {
        const result = resolveMaskedAttribute({
            value,
            referenceValue: value
        });
        expect(result).toBe(value);
    });

    it(`should return the passed value if its value is not "<secret>"`, () => {
        const attributeMetadata: AttributeMetadata<string> = {};
        const result = resolveMaskedAttribute({
            value,
            referenceValue: value,
            attributeMetadata
        });
        expect(result).toBe(value);
    });

    it(`should return the passed referenceValue if the passed value is "<secret>"`, () => {
        const attributeMetadata: AttributeMetadata<string> = {
            isSecret: true
        };
        const result = resolveMaskedAttribute({
            value: "<secret>",
            referenceValue: value,
            attributeMetadata
        });
        expect(result).toBe(value);
    });

});
