import { type Parameters } from "../types/types";

function getRandomValue(max: number, min: number, except?: number): number {
    const randomValue: number = Math.floor(Math.random() * (max + 1 - min) + min);

    if (except !== undefined) {
        if (randomValue === except) {
            return getRandomValue(max, min, except);
        }
    }
    return randomValue;

}

export function Parameters_generation(): object {
    const parameters: Partial<Parameters> = {
        attack: 1,
        health: 1,
        protect: 1,
        critDamage: 1,
        critChance: 1
    }
    const names = Object.keys(parameters) as (keyof Parameters)[];
    const mainParameter = names[getRandomValue(4, 0)] as keyof Parameters;
    parameters[mainParameter] = 10;
    const quantitySideParameters: number = getRandomValue(4, 2);
    const deleteValue: number = getRandomValue(4, 0, names.indexOf(mainParameter));

    switch (quantitySideParameters) {
        case 3:
            delete parameters[names[deleteValue]];
            return parameters;
        case 2:
            delete parameters[names[deleteValue]];
            names.splice(deleteValue, 1);
            delete parameters[names[getRandomValue(3, 0, names.indexOf(mainParameter))]];
            return parameters;
        default:
            return parameters;
    }
}