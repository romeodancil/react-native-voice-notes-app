import { ThunkAction, configureStore, Action } from '@reduxjs/toolkit';
import { audioSlice } from '../feature/audio/audioSlice';

export const store: any = configureStore({
  reducer: {
    audioReducer: audioSlice.reducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
