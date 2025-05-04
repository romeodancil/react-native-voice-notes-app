import { Text, TouchableOpacity, View } from "react-native"
import { audioStyle } from "../AudioStyles"

export type ListProps = {
    file: string,
    timeStamp: string,
    path: string,
    onPlay?: (path: string) => void,
    onDelete?: (path: string) => void;
}

export const AudioList = ({ file, timeStamp, onPlay, onDelete, path }: ListProps) => {
    return (
        <View style={audioStyle.container}>
            <Text>File: {file}</Text>
            <Text>Times Stamp: {new Date(timeStamp).toLocaleString()}</Text>
            <View style={audioStyle.actions}>
                <TouchableOpacity onPress={() => {
                    onPlay && onPlay(path)
                }}>
                    <Text style={audioStyle.play}>Play</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    onDelete && onDelete(path)
                }}>
                    <Text style={audioStyle.delete}>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}