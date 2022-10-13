import { maskSecretAttribute } from "../mask-secret-attribute.function";

describe("maskSecretAttribute", () => {

    it(`should return null if undefined is passed`, () => {
        const result = maskSecretAttribute();
        expect(result).toBeNull();
    });

    it(`should return null if null is passed`, () => {
        const result = maskSecretAttribute(null);
        expect(result).toBeNull();
    });

    it(`should return "<secret>" if a string is passed`, () => {
        const password = "1234";
        const result = maskSecretAttribute(password);
        expect(result).toBe("<secret>");
    });

});
