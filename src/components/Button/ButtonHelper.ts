import { Variant } from "./Button";

export const ButtonColorHelper = (variant: Variant) => {
    switch(variant) {
        case 'error':
            return '#FF0000';
        default:
            return '#0D98BA'
    }
}