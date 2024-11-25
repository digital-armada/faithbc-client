import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "@/redux/services/apiSlice";
import playerReducer from "@/redux/features/playerSlice";
import sidebarReducer from "@/redux/features/sidebarSlice";
// import { sermonsApi } from "@/features/sermons/api/sermons-api";

export const store = configureStore({
  reducer: {
    // [sermonsApi.reducerPath]: sermonsApi.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    player: playerReducer,
    sidebar: sidebarReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  // .concat(sermonsApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
