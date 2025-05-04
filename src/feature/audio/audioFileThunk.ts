import { createAsyncThunk } from "@reduxjs/toolkit";
import { ListAllAudioFile } from "../../services/fileService";
import { ListProps } from "../../screens/Audio/components/AudioList";

export const audioFileThunk = createAsyncThunk<ListProps[]>(
    'audio/audioFileThunk',
    async (): Promise<any> => {
        const data = await ListAllAudioFile();
        return data;
    }
)