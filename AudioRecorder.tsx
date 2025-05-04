import React, { useState, useRef, useEffect } from 'react';
import { View, Button, Text, Platform } from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import RNFS from 'react-native-fs';
import { formatTime } from './src/utils/helper';

const AudioRecorder = () => {
  const audioRecorderPlayer = useRef(new AudioRecorderPlayer()).current;
  const [recording, setRecording] = useState(false);
  const [recordTime, setRecordTime] = useState('00:00:00');
  const [recordings, setRecordings] = useState<{ path: string; name: string; timestamp: string }[]>([]);

  const onStartRecord = async () => {
    const filename = Platform.select({
      ios: `${Date.now()}.m4a`,
      android: `${Date.now()}.mp3`,
    });
    
    await audioRecorderPlayer.startRecorder(filename);
    audioRecorderPlayer.addRecordBackListener((e) => {
      setRecordTime(formatTime(e.currentPosition));
      return;
    });

    setRecording(true);
  };

  const onStopRecord = async () => {
    const recordedPath = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    setRecording(false);
    setRecordTime('00:00:00');

    const newPath = `${RNFS.DocumentDirectoryPath}/recordings/${Date.now()}.m4a`;
    await RNFS.moveFile(recordedPath, newPath);
  };

  const onStartPlay = async (path: string) => {
    try {
      const fixedPath = Platform.OS === 'ios' ? `file://${path}` : path;
      const fileExists = await RNFS.exists(fixedPath);
      if (!fileExists) {
        console.error("File does not exist");
        return;
      }
      await audioRecorderPlayer.stopPlayer();
      await audioRecorderPlayer.startPlayer(fixedPath);
      audioRecorderPlayer.addPlayBackListener((e) => {
        if (e.currentPosition >= e.duration) {
          audioRecorderPlayer.stopPlayer();
          audioRecorderPlayer.removePlayBackListener();
        }
        return;
      });
    } catch(error) {
      console.error("error playing the audio file", error) 
    }
  };

  const setupRecordingFolder = async () => {
    const dirPath = `${RNFS.DocumentDirectoryPath}/recordings`;
    const exists = await RNFS.exists(dirPath);
    if (!exists) {
      await RNFS.mkdir(dirPath);
      console.log('Directory created at:', dirPath);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      audioRecorderPlayer.removeRecordBackListener();
      audioRecorderPlayer.removePlayBackListener();
    };

    setupRecordingFolder()
  }, []);

  const listRecordings = async () => {
    const dirPath = `${RNFS.DocumentDirectoryPath}/recordings`;
    const files = await RNFS.readDir(dirPath);
  
    const recordingsWithTimestamps = files.map((file) => {
      const timestamp = parseInt(file.name.split('.')[0], 10);
      const date = new Date(timestamp);
      return {
        path: file.path,
        name: file.name,
        timestamp: date.toLocaleString(),
      };
    });

    setRecordings(recordingsWithTimestamps);
  };

  const onDelete = async (path: string) => {
    try {
      const exists = await RNFS.exists(path);
      if (exists) {
        await RNFS.unlink(path);
      } else {
        console.warn('File does not exist:', path);
      }
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  }


  return (
    <View>
      <Text>Recording Time: {recordTime}</Text>
      <Button
        title={recording ? 'Stop Recording' : 'Start Recording'}
        onPress={recording ? onStopRecord : onStartRecord}
      />
      <View style={{ marginVertical: 10 }}>
        <Button title="List Recordings" onPress={listRecordings} />
      </View>
      {recordings.map((recording, index) => (
        <View key={index}>
          <Text style={{ fontSize: 12, color: 'gray' }}>{recording.timestamp}</Text>
          <Text>{recording.path?.split('/').pop()}</Text>
          <Button title="Play" onPress={() => onStartPlay(recording.path)} />
          <Button title="Delete" onPress={() => onDelete(recording.path)} />
        </View>
      ))}
    </View>
  );
};

export default AudioRecorder;