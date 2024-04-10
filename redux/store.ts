import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '@/redux/services/apiSlice';
import playerReducer from '@/redux/features/playerSlice';

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        player: playerReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware),
});
