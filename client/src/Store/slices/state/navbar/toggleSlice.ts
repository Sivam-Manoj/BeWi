import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isToggle: false,
};

const toggleSlice = createSlice({
  name: "toggle",
  initialState,
  reducers: {
    toggle(state) {
      state.isToggle = !state.isToggle;
    },
  },
});

export const { toggle } = toggleSlice.actions;
export default toggleSlice.reducer;
