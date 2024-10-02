import { Sermon } from "@/types/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // currentSermons: [],
  // currentIndex: 0,
  isActive: false,
  isPlaying: false,
  activeSermon: null as Sermon | null, // Fixing the type
  duration: 0,
  currentProgress: 0,
  buffered: 0,
  volume: 1,
  isReady: false,
  newCurrentProgress: 0,
};
const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setActiveSermon: (state, action) => {
      state.activeSermon = action.payload.sermon;

      if (action.payload == false) {
        state.isActive = false;
      } else {
        state.isActive = true;
        // Check if it's a new sermon

        if (state.activeSermon?.id == action.payload.sermon.id) {
          // Reset the currentProgress and newCurrentProgress to 0
          state.currentProgress = 0;
          state.newCurrentProgress = 0;
        }
      }
    },

    playPause: (state, action) => {
      state.isPlaying = action.payload;
    },
    setDuration(state, action) {
      state.duration = action.payload;
    },
    setCurrentProgress(state, action) {
      state.currentProgress = action.payload;
      if (action.payload === 0) {
        state.newCurrentProgress = 0;
      }
    },

    setNewCurrentProgress(state, action) {
      state.newCurrentProgress = action.payload;
    },
    setBuffered(state, action) {
      state.buffered = action.payload;
    },
    setVolume: (state, action) => {
      state.volume = action.payload;
    },
    setIsReady: (state, action) => {
      state.isReady = action.payload;
    },
  },
});

export const {
  setActiveSermon,
  // nextSermon, prevSermon,
  playPause,
  setDuration,
  setCurrentProgress,
  setBuffered,
  setVolume,
  setIsReady,
  setNewCurrentProgress,
} = playerSlice.actions;

export default playerSlice.reducer;
