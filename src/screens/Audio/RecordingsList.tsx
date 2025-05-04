import { FlatList } from "react-native"
import { AudioList, ListProps } from "./components/AudioList"
import { memo } from "react"

interface RecordingListProps {
    data: ListProps[],
    onPlay?: (path: string) => void;
    onDelete?: (path: string) => void;
}

export const RecordingsList = memo(({ data, onDelete, onPlay }: RecordingListProps) => {
    return (
        <FlatList
            data={data}
            renderItem={({item}) => (
                <AudioList 
                    file={item.file}
                    timeStamp={item.timeStamp}
                    path={item.path}
                    onDelete={onDelete}
                    onPlay={onPlay}
                />
            )}
            keyExtractor={item => item.timeStamp}
        />
    )
})