import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteAudio } from "../../services/fileService";

export const deleteAudioFileThunk = createAsyncThunk(
    'audio/deleteAudioFileThunk',
    async (payload: { path: string }): Promise<any> => {
        const { path } = payload;
        const data = await deleteAudio(path);
        return data;
    }
)