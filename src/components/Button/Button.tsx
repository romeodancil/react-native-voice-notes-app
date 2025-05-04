import { Text, TouchableOpacity, View } from "react-native";
import { ButtonStyle } from "./ButtonStyle";

export type Variant = 'success' | 'error'

export const Button = ({ title, onPress, variant = 'success', disabled }: {
    title: string,
    onPress: () => void,
    variant?: Variant,
    disabled?: boolean
}) => {
    const style = ButtonStyle(variant)
    return (
        <View style={style.container}>
            <TouchableOpacity disabled={disabled} style={style.button} onPress={onPress}>
                <Text style={style.text}>{title}</Text>
            </TouchableOpacity>
        </View>
    )
}