import { StyleSheet } from "react-native";

export const audioStyle = StyleSheet.create({
    container: {
        marginTop: 24,
    },
    recorderContainer: {
        alignItems: 'center'
    },
    actions: {
        flexDirection: "row",
        marginTop: 8
    },
    play: {
        marginRight: 8,
        color: '#0D98BA'
    },
    delete: {
        marginRight: 8,
        color: '#FF0000'
    },
    time: {
        marginTop: 24,
        marginBottom: 24,
        fontSize: 14,
        letterSpacing: 0.5,
        fontStyle: "normal"
    }
});