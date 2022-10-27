// @ts-nocheck
import { createSlice } from "@reduxjs/toolkit";
import {
  addUser,
  getAllUsers,
  findUser,
  deleteUser,
  updateUser,
  updateUserBooks,
} from "services/user-services";
import { userState } from "types";

const initialState: userState = {
  items: [],
  isLoading: false,
  error: false,
  item: {
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    isAdmin: false,
    books: [],
  },
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getAllUsers.pending, (state) => {
      state.isLoading = true;
      state.error = false;
    });

    builder.addCase(getAllUsers.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    });

    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.items = action.payload?.data;
      state.isLoading = false;
      state.error = false;
    });

    builder.addCase(addUser.pending, (state) => {
      state.isLoading = true;
      state.error = false;
    });

    builder.addCase(addUser.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    });

    builder.addCase(addUser.fulfilled, (state, action) => {
      state.items = [...state.items, action.payload?.data];
      alert("User added successfully");
      state.isLoading = false;
      state.error = false;
    });

    builder.addCase(findUser.pending, (state) => {
      state.isLoading = true;
      state.error = false;
    });

    builder.addCase(findUser.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    });

    builder.addCase(findUser.fulfilled, (state, action) => {
      state.item = action.payload?.data;
      state.isLoading = false;
      state.error = false;
    });

    builder.addCase(deleteUser.pending, (state) => {
      state.isLoading = true;
      state.error = false;
    });

    builder.addCase(deleteUser.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    });

    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.items = state.items.filter(
        (item) => item._id !== action.payload?.data
      );
      alert(action.payload?.data.message);
      state.isLoading = false;
      state.error = false;
    });

    builder.addCase(updateUser.pending, (state) => {
      state.isLoading = true;
      state.error = false;
    });

    builder.addCase(updateUser.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    });

    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.item = action.payload?.data;
      alert("User updated successfully");
      state.isLoading = false;
      state.error = false;
    });

    builder.addCase(updateUserBooks.pending, (state) => {
      state.isLoading = true;
      state.error = false;
    });

    builder.addCase(updateUserBooks.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    });

    builder.addCase(updateUserBooks.fulfilled, (state, action) => {
      //state.item = action.payload?.data;
      state.item.books = [...state.item.books, action.payload?.data];
      alert("User books successfully");
      state.isLoading = false;
      state.error = false;
    });
  },
});

export default usersSlice.reducer;
