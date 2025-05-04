import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { audioFileThunk } from "./audioFileThunk";
import { ListProps } from "../../screens/Audio/components/AudioList";
import { RootState } from "../../store/store";
import { deleteAudioFileThunk } from "./deleteAudioFileThunk";

export interface AudoState {
    data: ListProps[];
}

const initialState: AudoState = {
    data: []
}

export const audioSlice = createSlice({
    name: "audio",
    initialState,
    reducers: {
    },
    extraReducers(builder) {
        builder.addCase(audioFileThunk.fulfilled, (state, action) => {
            state.data = action.payload;
        });
        builder.addCase(deleteAudioFileThunk.fulfilled, (state, action) => {
            state.data = action.payload;
        })
    },
});

export const useDataFileSelector = (state: RootState) => {
    return state.audioReducer.data
}

export default audioSlice.reducer;