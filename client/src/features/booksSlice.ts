import { createSlice } from "@reduxjs/toolkit";
import {
  addBook,
  getAllBooks,
  findBook,
  deleteBook,
  updateBook,
  findByGenre,
} from "services/book-services";
import { booksState } from "types";

const initialState: booksState = {
  items: [],
  isLoading: false,
  error: false,
  item: {
    _id: "",
    isbn: "",
    genre: "",
    title: "",
    image: "",
    description: "",
    publisher: "",
    author: "",
    status: "",
    publishDate: "",
    borrowDate: "",
    returnDate: "",
    borrowerId: "",
  },
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getAllBooks.pending, (state) => {
      state.isLoading = true;
      state.error = false;
    });

    builder.addCase(getAllBooks.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    });

    builder.addCase(getAllBooks.fulfilled, (state, action) => {
      state.items = action.payload?.data;
      state.isLoading = false;
      state.error = false;
    });

    builder.addCase(findByGenre.pending, (state) => {
      state.isLoading = true;
      state.error = false;
    });

    builder.addCase(findByGenre.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    });

    builder.addCase(findByGenre.fulfilled, (state, action) => {
      state.items = action.payload?.data;
      state.isLoading = false;
      state.error = false;
    });

    builder.addCase(addBook.pending, (state) => {
      state.isLoading = true;
      state.error = false;
    });

    builder.addCase(addBook.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    });

    builder.addCase(addBook.fulfilled, (state, action) => {
      state.items = [...state.items, action.payload?.data];
      alert("Book added successfully");
      state.isLoading = false;
      state.error = false;
    });

    builder.addCase(findBook.pending, (state) => {
      state.isLoading = true;
      state.error = false;
    });

    builder.addCase(findBook.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    });

    builder.addCase(findBook.fulfilled, (state, action) => {
      state.item = action.payload?.data;
      state.isLoading = false;
      state.error = false;
    });

    builder.addCase(deleteBook.pending, (state) => {
      state.isLoading = true;
      state.error = false;
    });

    builder.addCase(deleteBook.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    });

    builder.addCase(deleteBook.fulfilled, (state, action) => {
      state.items = state.items.filter(
        (item) => item._id !== action.payload?.data
      );
      alert(action.payload?.data.message);
      state.isLoading = false;
      state.error = false;
    });

    builder.addCase(updateBook.pending, (state) => {
      state.isLoading = true;
      state.error = false;
    });

    builder.addCase(updateBook.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    });

    builder.addCase(updateBook.fulfilled, (state, action) => {
      state.item = action.payload?.data;
      alert("Book updated successfully");
      state.isLoading = false;
      state.error = false;
    });
  },
});

export default booksSlice.reducer;
