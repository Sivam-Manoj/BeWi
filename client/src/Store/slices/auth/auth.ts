import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode"; // Install via npm: `npm install jwt-decode`

interface User {
  id: number;
  name: string;
  email?: string;
  role: string; // Adding the role of the user
  [key: string]: unknown; // Extendable for additional user properties
}

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  token: string | null; // Store the JWT token
}

const initialState: AuthState = {
  user: null,
  isLoggedIn: false,
  token: null,
};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ token: string }>) {
      const { token } = action.payload;
      state.token = token;

      try {
        // Decode the JWT to extract user details
        const decodedUser: User = jwtDecode(token);
        console.log("Decoded user from token:", decodedUser);

        state.user = decodedUser;
        state.isLoggedIn = true;

        // Store the token in cookies with a 30-day expiration
        Cookies.set("token", token, { expires: 30 });
      } catch (error) {
        console.error("Error decoding token:", error);
        state.user = null;
        state.isLoggedIn = false;
        state.token = null;
      }
    },
    logout(state) {
      console.log('logout now...')
      state.user = null;
      state.isLoggedIn = false;
      state.token = null;
      Cookies.remove("token");
    },
    checkAuth(state) {
      const token = Cookies.get("token");
      if (token) {
        try {
          const decodedUser: User = jwtDecode(token);
          state.user = decodedUser;
          state.isLoggedIn = true;
          state.token = token;
        } catch (error) {
          console.error("Invalid token:", error);
          state.user = null;
          state.isLoggedIn = false;
          state.token = null;
        }
      } else {
        state.user = null;
        state.isLoggedIn = false;
        state.token = null;
      }
    },
  },
});

export const { login, logout, checkAuth } = auth.actions;
export default auth.reducer;
