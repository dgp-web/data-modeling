import { maskAttribute } from "../mask-model.function";
import { AttributeMetadata } from "../../../models";

describe("maskAttribute", () => {

    const password = "1234";

    it(`should return a masked value if a string is passed and isSecret is true`, () => {
        const attributeMetadata: AttributeMetadata<string> = {isSecret: true};

        const result = maskAttribute({
            value: password,
            attributeMetadata
        });

        expect(result).toBe("<secret>");
    });

    it(`should return the passed value if a string is passed and isSecret is not set or false`, () => {
        const attributeMetadata: AttributeMetadata<string> = {isSecret: false};

        const result = maskAttribute({
            value: password,
            attributeMetadata
        });

        expect(result).toBe(password);
    });

});
