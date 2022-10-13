import { maskArray, maskArrayConfig } from "../mask-model.function";
import { ArrayMetadata } from "../../../models";

describe("maskArray", () => {

    const password = "1234";

    it(`should return the passed value no metadata are passed`, () => {
        const result = maskArray({
            array: [password]
        });

        expect(result).toEqual([password]);
    });

    it(`should proxy null or undefined`, () => {
        const result = maskArray({
            array: null
        });

        expect(result).toBeNull();
    });

    it(`should call maskAttribute for included attributes`, () => {
        spyOn(maskArrayConfig, "maskAttribute").and.callThrough();

        const arrayMetadata: ArrayMetadata<string> = {};

        maskArray({
            array: [password],
            arrayMetadata
        });

        expect(maskArrayConfig.maskAttribute).toHaveBeenCalledWith({
            value: password,
            valueMetadata: undefined
        });
    });

    it(`should call maskModel for included models`, () => {
        spyOn(maskArrayConfig, "maskModel").and.callThrough();

        const arrayMetadata: ArrayMetadata<{ password: string; }> = {};

        maskArray({
            array: [{password}],
            arrayMetadata
        });

        expect(maskArrayConfig.maskModel).toHaveBeenCalledWith({
            model: {password},
            modelMetadata: undefined
        }, maskArrayConfig);
    });

    it(`should call maskArray for included models`, () => {
        spyOn(maskArrayConfig, "maskArray").and.callThrough();

        const arrayMetadata: ArrayMetadata<string[]> = {};

        maskArray({
            array: [[password]],
            arrayMetadata
        });

        expect(maskArrayConfig.maskArray).toHaveBeenCalledWith({
            array: [password],
            arrayMetadata: undefined
        }, maskArrayConfig);
    });

});
