# data modeling

The ``data-modeling`` library contains TypeScript interfaces that help describe complex domains with 
[Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html), [Mapped types](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html),
and concepts from storage paradigms such as [redux](https://redux.js.org/).

From a JavaScript perspective, there is nothing in this library, ``data modeling`` has no opinion about what happens
at runtime while enabling programmers to derive complex structures from simple ones and providing mental scaffolds
at design time.

We like to think about ``data-modeling`` as experiences cast into flexible interfaces geared towards
building sophisticated data-handling in application systems relying on TypeScript.

## Features

The following examples demonstrate the features of ``data-modeling`` and rely
on a ``User`` and a ``Group`` to do so.

````typescript
export interface User {
    userId: number;

    groupId?: number;

    label: string;
    age?: number;
}

export interface Group {
    groupId: number;
}

export interface Entities {
    user: User;
    group: Group;
}
````

### Model metadata

Express additional information about models such as descriptions,
display names, or allowed sizes of numbers and labels.

Even relationships between models can be expressed.

````typescript
import { ModelMetadata } from "data-modeling";

export const userMetadata: ModelMetadata<User, Entities> = {
    id: x => x.userId.toString(),
    label: "User",
    description: "A user of the application",
    attributes: {
        label: {
            label: "Name",
            icon: "label",
            min: 4,
            max: 64,
            required: true
        },
        age: {
            label: "Age",
            min: 0,
            max: 120,
            step: 1
        }
    },
    relationships: {
        toGroup: (user, state) => state.group.entities[user.groupId]
    }
};
````

### Entity states
Tbd

### Common types
Tbd

## Roadmap

### Mapping to [Ajv](https://ajv.js.org/) types
Tbd