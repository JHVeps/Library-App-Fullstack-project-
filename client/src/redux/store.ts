import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import booksReducer from "features/booksSlice";
import usersReducer from "features/usersSlice";
//import authReducer from "features/authSlice";

export const store = configureStore({
  reducer: {
    books: booksReducer,
    users: usersReducer,
    //auth: authReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
