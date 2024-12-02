import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "./api/apiSlice"; // Path to your API slice file
import toggleSlice from "./slices/state/navbar/toggleSlice";
import authSLice from "./slices/auth/auth";
const store = configureStore({
  reducer: {
    auth: authSLice,
    [apiSlice.reducerPath]: apiSlice.reducer, // Add the API slice reducer
    toggle: toggleSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware), // Add the API middleware
  devTools: true, // Keep this for debugging in development mode
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
