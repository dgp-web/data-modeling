import { maskModel, maskModelConfig } from "../mask-model.function";
import { ModelMetadata } from "../../../models";

describe("maskModel", () => {

    const password = "1234";
    const model = {password};

    it(`should return the passed value no metadata are passed`, () => {
        const result = maskModel({model});

        expect(result).toEqual(model);
    });

    it(`should proxy null or undefined`, () => {
        const result = maskModel({
            model: null
        });

        expect(result).toBeNull();
    });

    it(`should call maskAttribute for included attributes`, () => {
        spyOn(maskModelConfig, "maskAttribute").and.callThrough();

        const modelMetadata: ModelMetadata<typeof model> = {};

        maskModel({
            model,
            modelMetadata
        });

        expect(maskModelConfig.maskAttribute).toHaveBeenCalledWith({
            value: password,
            attributeMetadata: undefined
        });
    });

    it(`should call maskModel for included models`, () => {
        spyOn(maskModelConfig, "maskModel").and.callThrough();

        const modelMetadata: ModelMetadata<{ nested: typeof model }> = {};

        maskModel({
            model: {nested: model},
            modelMetadata
        });

        expect(maskModelConfig.maskModel).toHaveBeenCalledWith({
            model,
            modelMetadata: undefined
        }, maskModelConfig);
    });

    it(`should call maskArray for included models`, () => {
        spyOn(maskModelConfig, "maskArray").and.callThrough();

        const modelMetadata: ModelMetadata<{ nested: typeof model[] }> = {};

        maskModel({
            model: {nested: [model]},
            modelMetadata
        });

        expect(maskModelConfig.maskArray).toHaveBeenCalledWith({
            array: [model],
            arrayMetadata: undefined
        }, maskModelConfig);
    });

    it(`should mask secret attributes in the passed model`, () => {

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

        const result = maskModel({
            model,
            modelMetadata
        });

        const expectedResult = {
            shouldBeSecret: "<secret>",
            regular: "regular",
            items: [{
                shouldBeSecret: "<secret>",
                regular: "regular"
            }],
            nested: {
                shouldBeSecret: "<secret>",
                regular: "regular"
            }
        };

        expect(result).toEqual(expectedResult);

    });

});
