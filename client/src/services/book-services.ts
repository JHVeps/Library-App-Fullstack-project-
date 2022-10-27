import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Book, updateType } from "types";

const baseUrl = "http://localhost:4000/api/v1/books";
const token = localStorage.getItem("token");

export const getAllBooks = createAsyncThunk("books/fetch", async () => {
  const config = {
    method: "GET",
    url: baseUrl,
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    let res = await axios(config);
    console.log(res.data);
    return { data: res.data, status: res.status };
  } catch (error: any) {
    console.log("error", error.response.status);
    alert(error);
    return;
  }
});

export const findBook = createAsyncThunk(
  "books/findbook",
  async (isbn: string) => {
    const config = {
      method: "GET",
      url: `${baseUrl}/${isbn}`,
      headers: {},
    };
    try {
      let res = await axios(config);
      console.log(res.data);
      return { data: res.data, status: res.status };
    } catch (error) {
      alert(error);
      return;
    }
  }
);

export const findByGenre = createAsyncThunk(
  "books/genre",
  async (genre: string) => {
    const config = {
      method: "GET",
      url: `${baseUrl}/book/${genre}`,
      headers: {},
    };
    try {
      let res = await axios(config);
      console.log(res.data);
      return { data: res.data, status: res.status };
    } catch (error) {
      alert(error);
      return;
    }
  }
);

export const addBook = createAsyncThunk(
  "books/addbook",
  async (newBook: Book) => {
    const config = {
      method: "POST",
      url: baseUrl,
      data: newBook,
      headers: {},
    };
    try {
      let res = await axios(config);
      console.log(res.data);
      return { data: res.data, status: res.status };
    } catch (error) {
      alert(error);
      return;
    }
  }
);

export const deleteBook = createAsyncThunk(
  "books/deletebook",
  async (_id: string) => {
    const config = {
      method: "DELETE",
      url: `${baseUrl}/${_id}`,
      headers: {},
    };
    try {
      let res = await axios(config);
      console.log(res.data);
      window.location.reload(); //--> There must be a better way to do this
      return { data: res.data, status: res.status };
    } catch (error) {
      alert(error);
      return;
    }
  }
);

export const updateBook = createAsyncThunk(
  "books/updatebook",
  async (data: updateType) => {
    const { _id, updatedBook } = data;
    const config = {
      method: "PUT",
      url: `${baseUrl}/${_id}`,
      data: updatedBook,
      headers: {},
    };
    try {
      let res = await axios(config);
      console.log(res.data);
      // window.location.reload(); //--> There must be a better way to do this
      return { data: res.data, status: res.status };
    } catch (error) {
      alert(error);
      return;
    }
  }
);
