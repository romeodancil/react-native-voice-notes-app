import { useEffect } from "react";
import { useAppDispatch } from "../hooks/hooks"
import { Recorder } from "../screens/Audio/Recorder"
import { audioFileThunk } from "../feature/audio/audioFileThunk";

export const AudioPage = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(audioFileThunk());
    }, [])

    return (
        <>
            <Recorder />
        </>
    )
}