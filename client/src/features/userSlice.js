import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const addUser = createAsyncThunk(
  "user/addUser",
  async ({ name, password_1, mail }, thunkAPI) => {
    try {
      const response = await axios.post("http://localhost:3030/register", {
        name,
        password_1,
        mail,
      });
      const json = response.data;
      if (json.error) {
        return thunkAPI.rejectWithValue(json.error);
      }
      return json;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

export const signIn = createAsyncThunk(
  "user/signIn",
  async ({ login, password }, thunkAPI) => {
    try {
      console.log("2");
      const response = await axios.post("http://localhost:3030/login", {
        login,
        password,
      });

      const json = response.data;
      console.log(json);
      if (json.error) {
        console.log(json);
        return thunkAPI.rejectWithValue(json.error);
      }
      localStorage.setItem("token", json);

      return json;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    error: null,
    loading: false,
    token: localStorage.getItem("token"),
  },
  reducers: {
    deleteToken: (state, action) => {
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
        state.error = null;
      })
      // ===== Авторизация =====
      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signIn.rejected, (state, action) => {
        // console.log(action.payload);
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.token = action.payload;
        state.loading = false;
        state.error = null;
      });
  },
});

export const { deleteToken } = userSlice.actions;
export default userSlice.reducer;