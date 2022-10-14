import { resolvedMaskedModelConfig, resolveMaskedModel } from "../resolve-masked-model.function";
import { ModelMetadata } from "../../../models";

describe("resolveMaskedModel", () => {

    const attribute = "test";
    const model = {attribute};

    it("should return a null or undefined value", () => {
        const result = resolveMaskedModel({
            model: null
        });
        expect(result).toBeNull();
    });

    it("should return the passed model if there's no referenceModel", () => {
        const result = resolveMaskedModel({
            model,
            referenceModel: null
        });
        expect(result).toBe(model);
    });

    it("should return the passed model if there's no modelMetadata", () => {
        const result = resolveMaskedModel({
            model,
            referenceModel: model
        });
        expect(result).toBe(model);
    });

    it("should call resolveMaskedAttribute for included attributes", () => {
        spyOn(resolvedMaskedModelConfig, "resolveMaskedAttribute").and.callThrough();
        const modelMetadata: ModelMetadata<typeof model> = {};
        resolveMaskedModel({
            model,
            referenceModel: model,
            modelMetadata
        });
        expect(resolvedMaskedModelConfig.resolveMaskedAttribute).toHaveBeenCalledWith({
            value: attribute,
            referenceValue: attribute,
            attributeMetadata: undefined
        });
    });

    it(`should call resolveMaskedArray for included arrays`, () => {
        spyOn(resolvedMaskedModelConfig, "resolveMaskedArray").and.callThrough();
        const modelWithArray = {
            items: [model]
        };
        const modelMetadata: ModelMetadata<typeof modelWithArray> = {};
        resolveMaskedModel({
            model: modelWithArray,
            referenceModel: modelWithArray,
            modelMetadata
        });
        expect(resolvedMaskedModelConfig.resolveMaskedArray).toHaveBeenCalledWith({
            array: modelWithArray.items,
            referenceArray: modelWithArray.items,
            arrayMetadata: undefined
        }, resolvedMaskedModelConfig);
    });

    it(`should call resolveMaskedModel for included models`, () => {
        spyOn(resolvedMaskedModelConfig, "resolveMaskedModel").and.callThrough();
        const modelWithNested = {
            nested: model
        };
        const modelMetadata: ModelMetadata<typeof modelWithNested> = {};
        resolveMaskedModel({
            model: modelWithNested,
            referenceModel: modelWithNested,
            modelMetadata
        });
        expect(resolvedMaskedModelConfig.resolveMaskedModel).toHaveBeenCalledWith({
            model: modelWithNested.nested,
            referenceModel: modelWithNested.nested,
            modelMetadata: undefined
        }, resolvedMaskedModelConfig);
    });

});
