import { type Parameters } from "../types/types";
export function parameters_improve(parameters: Parameters, improve_count: number): { parameters: Parameters, improve_count: number } {
    const quntityParameters: number = Object.keys(parameters).length;

    switch (quntityParameters) {
        case 5:
            if (improve_count < 5) {
                improve_count += 1;
            }
    }
    return { parameters, improve_count }
}