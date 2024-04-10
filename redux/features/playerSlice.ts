import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    // currentSermons: [],
    // currentIndex: 0,
    isActive: false,
    isPlaying: false,
    activeSermon: {},
};

const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        setActiveSermon: (state, action) => {
            state.activeSermon = action.payload.sermon;
            state.isActive = true;

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
            console.log(state, action);
            state.isPlaying = action.payload;
        },
    },
});

export const {
    setActiveSermon,
    // nextSermon, prevSermon,
    playPause,
} = playerSlice.actions;

export default playerSlice.reducer;
