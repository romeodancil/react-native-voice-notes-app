import { Animated, Easing, Image, Platform, Text, View } from "react-native"
import { Button } from "../../components/Button/Button"
import { useState, useRef, useMemo, useCallback, useEffect } from "react"
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import { MoveRecordingAudioFile } from "../../services/fileService";
import { formatTime } from "../../utils/helper";
import { audioStyle } from "./AudioStyles";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { audioFileThunk } from "../../feature/audio/audioFileThunk";
import { useDataFileSelector } from "../../feature/audio/audioSlice";
import { ListProps } from "./components/AudioList";
import { RecordingsList } from "./RecordingsList";
import { deleteAudioFileThunk } from "../../feature/audio/deleteAudioFileThunk";

export const Recorder = () => {
    const dispatch = useAppDispatch();
    const dataSelector = useAppSelector(useDataFileSelector)
    const audioRecorderPlayer = useRef(new AudioRecorderPlayer()).current;
    const [isRecording, setIsRecording] = useState(false);
    const [recordTime, setRecordTime] = useState('00:00:00');
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const pulseAnim = useRef<Animated.CompositeAnimation | null>(null);
    
    const sortedAudioListData = useMemo(() => {
        return [...(dataSelector || [])]?.sort((a: ListProps, b: ListProps) =>
             parseInt(b.timeStamp, 10) - parseInt(a.timeStamp, 10)
        );
    }, [dataSelector]);

    const startRecording = async () => {
        const filename = Platform.select({
            ios: `${Date.now()}.m4a`,
            android: `${Date.now()}.mp3`,
        });
        
        await audioRecorderPlayer.startRecorder(filename);
        audioRecorderPlayer.addRecordBackListener((e: { currentPosition: number; }) => {
            setRecordTime(formatTime(e.currentPosition));
            return;
        });

        setIsRecording(true);
        startPulse();
    }

    const onStopRecording = async () => {
        const recordedPath = await audioRecorderPlayer.stopRecorder();
        audioRecorderPlayer.removeRecordBackListener();
        setIsRecording(false);
        setRecordTime('00:00:00');
        MoveRecordingAudioFile(recordedPath)

        // dispatch listing of all files
        dispatch(audioFileThunk());
        stopPulse();
    };

    const startPulse = () => {
        pulseAnim.current = Animated.loop(
          Animated.sequence([
            Animated.timing(scaleAnim, {
              toValue: 1.3,
              duration: 400,
              useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
              toValue: 1,
              duration: 400,
              useNativeDriver: true,
            }),
          ])
        );
        pulseAnim.current.start();
      };
    
      const stopPulse = () => {
        pulseAnim.current?.stop();
        scaleAnim.setValue(1); // reset scale
      };
    

    const playAudio = useCallback((path: string) => {
      try {
           const fixedPath = Platform.OS === 'ios' ? `file://${path}` : path;
           audioRecorderPlayer.stopPlayer();
           startPulse();
           audioRecorderPlayer.removePlayBackListener();
           audioRecorderPlayer.startPlayer(fixedPath);
           audioRecorderPlayer.addPlayBackListener((e) => {
             if (e.currentPosition >= e.duration) {
               audioRecorderPlayer.stopPlayer();
               audioRecorderPlayer.removePlayBackListener();
               stopPulse();
             }
             return;
           });
         } catch(error) {
           console.error("error playing the audio file", error) 
         }   
    }, [audioRecorderPlayer])

    const deleteAudio = useCallback((path: string) => {
       dispatch(deleteAudioFileThunk({ path }))
    }, [audioRecorderPlayer])

    return (
        <View style={audioStyle.recorderContainer}>
            <View style={audioStyle.time}>
                <Text>Recording Time: {recordTime}</Text>
            </View>
            <Animated.View style={{ transform: [{ scale: scaleAnim }], marginBottom: 16 }}>
                <Image source={require('../../assets/img/microphone.png')} style={{ width: 50, height: 50 }} />
            </Animated.View>
            {!isRecording ? (
                <Button title="Start Recording" onPress={startRecording} />
            ) : (
                <Button variant="error" title="Stop Recording" onPress={onStopRecording} />
            )}
            <RecordingsList onPlay={playAudio} onDelete={deleteAudio} data={sortedAudioListData} />
        </View>
    )
}