import { StyleSheet } from "react-native"
import { Variant } from "./Button"
import { ButtonColorHelper } from "./ButtonHelper"

export const ButtonStyle = (variant: Variant) => {
    return StyleSheet.create({
        container: {    
            justifyContent: 'center',
            alignItems: 'center',
        },
        button: {
            backgroundColor: ButtonColorHelper(variant),
            padding: 12,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 12,
        },
        text: {
            color: '#FFFF',
            fontSize: 14,
            fontStyle: 'normal',
            fontWeight: '600',
            borderRadius: 8,
        }
    })
}