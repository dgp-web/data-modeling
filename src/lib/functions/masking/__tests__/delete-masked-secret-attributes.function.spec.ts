import { ModelMetadata } from "../../../models";
import { deleteMaskedSecretAttributes } from "../delete-masked-secret-attributes.function";

describe("deleteMaskedSecretAttributes", () => {

    it(`should leave out secret attributes in the passed model`, () => {

        const model = {
            shouldBeSecret: "<secret>",
            regular: "regular",
            items: [{
                shouldBeSecret: "<missing-secret>",
                regular: "regular"
            }],
            nested: {
                shouldBeSecret: "90",
                regular: "regular"
            }

        };
        const modelMetadata: ModelMetadata<typeof model> = {
            attributes: {
                shouldBeSecret: {
                    isSecret: true
                },
                items: {
                    item: {
                        attributes: {
                            shouldBeSecret: {
                                isSecret: true
                            }
                        }
                    }
                },
                nested: {
                    attributes: {
                        shouldBeSecret: {
                            isSecret: true
                        }
                    }
                }
            }
        };

        const result = deleteMaskedSecretAttributes({
            model,
            modelMetadata
        });

        const expectedResult = {
            regular: "regular",
            items: [{
                regular: "regular"
            }],
            nested: {
                shouldBeSecret: "90",
                regular: "regular"
            }
        };

        expect(result).toEqual(expectedResult);

    });

});
