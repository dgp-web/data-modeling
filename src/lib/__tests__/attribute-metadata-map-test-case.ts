import { AttributeMetadataMap } from "../models/attribute-metadata-map.model";

export interface Nested {
    readonly sub: number;
}

export interface TestModel {
    readonly label: string;
    readonly nested: Nested;
    readonly nestedArray: Array<Nested>;
    readonly stringArray: string[];
}

export const testModelMetadata: AttributeMetadataMap<TestModel> = {
    label: {
        pattern: /asd/
    },
    nested: {
        attributes: {}
    },
    nestedArray: {
        item: {
            attributes: {
                sub: {}
            }
        }
    },
    stringArray: {
        item: {}
    }
}
