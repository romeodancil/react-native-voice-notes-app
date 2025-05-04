import RNFS from 'react-native-fs';

export const MoveRecordingAudioFile = async (recordedPath: string) => {
    const newPath = `${RNFS.DocumentDirectoryPath}/recordings/${Date.now()}.m4a`;
    await RNFS.moveFile(recordedPath, newPath);
}

export const ListAllAudioFile = async () => {
    const dirPath = `${RNFS.DocumentDirectoryPath}/recordings`;
    const files = await RNFS.readDir(dirPath);
    
    return files.map((file) => {
        const timestamp = parseInt(file.name.split('.')[0], 10);
        return {
            path: file.path,
            file: file.name,
            timeStamp: timestamp,
        };
    });
}

export const deleteAudio = async (path: string) => {
    try {
        const exists = await RNFS.exists(path);
        if (exists) {
            await RNFS.unlink(path);
        } else {
            console.warn('File does not exist:', path);
        }
        return await ListAllAudioFile()
    } catch (error) {
        console.error('Error deleting file:', error);
    }
}