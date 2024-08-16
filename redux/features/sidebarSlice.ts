import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isCollapsed: true,
};

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isCollapsed = !state.isCollapsed;
    },
    setSidebarCollapsed: (state, action) => {
      state.isCollapsed = action.payload;
    },
  },
});

export const { toggleSidebar, setSidebarCollapsed } = sidebarSlice.actions;

export default sidebarSlice.reducer;
