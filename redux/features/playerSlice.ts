import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    // currentSermons: [],
    // currentIndex: 0,
    isActive: false,
    isPlaying: false,
    activeSermon: {},
    duration: 0,
    currentProgress: 0,
    buffered: 0,
};
console.log(initialState);
const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        setActiveSermon: (state, action) => {
            state.activeSermon = action.payload.sermon;
            if (action.payload == false) {
                state.isActive = false;
            } else {
                state.isActive = true;
            }
            // if (action.payload?.data?.tracks?.hits) {
            //     state.currentSermons = action.payload.data.tracks.hits;
            // } else if (action.payload?.data?.properties) {
            //     state.currentSermons = action.payload?.data?.tracks;
            // } else {
            //     state.currentSermons = action.payload.data;
            // }

            // state.currentIndex = action.payload.i;
            // console.log(state.currentIndex);
        },
        //         nextSermon: (state, action) => {
        //             if (state.currentSermons[action.payload]?.track) {
        //                 state.activeSermon =
        //                     state.currentSermons[action.payload]?.track;
        //             } else {
        //                 state.activeSermon = state.currentSermons[action.payload];
        //             }
        //
        //             state.currentIndex = action.payload;
        //             state.isActive = true;
        //         },
        //
        //         prevSermon: (state, action) => {
        //             if (state.currentSermons[action.payload]?.track) {
        //                 state.activeSermon =
        //                     state.currentSermons[action.payload]?.track;
        //             } else {
        //                 state.activeSermon = state.currentSermons[action.payload];
        //             }
        //
        //             state.currentIndex = action.payload;
        //             state.isActive = true;
        //         },

        playPause: (state, action) => {
            state.isPlaying = action.payload;
        },
        setDuration(state, action) {
            console.log(action.payload);
            state.duration = action.payload;
        },
        setCurrentProgress(state, action) {
            console.log(state);
            console.log(action.payload);
            state.currentProgress = action.payload;
        },
        setBuffered(state, action) {
            console.log(action.payload);
            state.buffered = action.payload;
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
} = playerSlice.actions;

export default playerSlice.reducer;
