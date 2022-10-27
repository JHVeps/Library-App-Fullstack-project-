import { createSlice } from "@reduxjs/toolkit";
//import { getToken } from "../services/auth-service";

// export interface authState {
//   token: object;
//   loggedIn: boolean;
//   isLoading: boolean;
//   error: boolean;
// }

// const initialState: authState = {
//   token: Object,
//   loggedIn: false,
//   isLoading: false,
//   error: false,
// };

const authSlice = createSlice({
  name: "auth",
  initialState: {
    login: null,
  },
  reducers: {
    login: (state, action) => {
      state.login = action.payload;
    },
    logout: (state) => {
      state.login = null;
    },
  },

  // extraReducers: (builder) => {
  //   builder.addCase(getToken.pending, (state: authState) => {
  //     state.loggedIn = false;
  //     state.isLoading = true;
  //     state.error = false;
  //   });
  //   builder.addCase(getToken.fulfilled, (state: authState, action) => {
  //     state.token = action.payload?.data.token;
  //     state.loggedIn = true;
  //     localStorage.setItem("token", JSON.stringify(state.token));
  //     state.isLoading = false;
  //     state.error = false;
  //   });
  //   builder.addCase(getToken.rejected, (state: authState, error) => {
  //     console.log(error);
  //     state.isLoading = false;
  //     state.loggedIn = false;
  //   });
  // },
});
export const { login, logout } = authSlice.actions;

export const selectAuth = (state: { login: { login: any } }) =>
  state.login.login;

export default authSlice.reducer;
