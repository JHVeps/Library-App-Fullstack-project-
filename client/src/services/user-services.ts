import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { User, updateUserType } from "types";

const baseUrl = "http://localhost:4000/api/v1/users";

export const getAllUsers = createAsyncThunk("users/fetch", async () => {
  const config = {
    method: "GET",
    url: baseUrl,
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
});

export const findUser = createAsyncThunk(
  "users/finduser",
  async (_id: string) => {
    const config = {
      method: "GET",
      url: `${baseUrl}/${_id}`,
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

export const addUser = createAsyncThunk(
  "users/adduser",
  async (newUser: User) => {
    const config = {
      method: "POST",
      url: baseUrl,
      data: newUser,
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

export const deleteUser = createAsyncThunk(
  "users/deleteuser",
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

export const updateUser = createAsyncThunk(
  "users/updateuser",
  async (data: updateUserType) => {
    const { _id, updatedUser } = data;
    const config = {
      method: "PUT",
      url: `${baseUrl}/${_id}`,
      data: updatedUser,
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

// Does not work
export const updateUserBooks = createAsyncThunk(
  "users/updateuserbooks",
  async (data: any) => {
    console.log("data:", data);
    const { userId, books } = data;
    const config = {
      method: "PUT",
      url: `${baseUrl}/borrow/${userId}`,
      data: { books },
      headers: {},
    };
    try {
      let res = await axios(config);
      console.log("data2:", res.data);
      //window.location.reload(); //--> There must be a better way to do this
      return { data: res.data, status: res.status };
    } catch (error) {
      alert(error);
      return;
    }
  }
);
