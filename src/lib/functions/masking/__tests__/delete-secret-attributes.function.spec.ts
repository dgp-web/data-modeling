import { ModelMetadata } from "../../../models";
import { deleteSecretAttributes } from "../delete-masked-attributes.function";

describe("deleteSecretAttributes", () => {

    it(`should leave out secret attributes in the passed model`, () => {

        const model = {
            shouldBeSecret: "1234",
            regular: "regular",
            items: [{
                shouldBeSecret: "5678",
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

        const result = deleteSecretAttributes({
            model,
            modelMetadata
        });

        const expectedResult = {
            regular: "regular",
            items: [{
                regular: "regular"
            }],
            nested: {
                regular: "regular"
            }
        };

        expect(result).toEqual(expectedResult);

    });

});
