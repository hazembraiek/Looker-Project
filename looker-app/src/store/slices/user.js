import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  banOne,
  createOne,
  deleteOne,
  getData,
  updateOne,
  unbanOne,
} from "../../services/protectApi";

export const getUsers = createAsyncThunk(
  "user/getUsers",
  async (params = {}, { rejectWithValue }) => {
    try {
      params = { ...params };
      const { data } = await getData("admin/users", params);
      return data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const createUser = createAsyncThunk(
  "user/createUser",
  async (newUser, { rejectWithValue }) => {
    try {
      const { data } = await createOne("admin/users", newUser);
      return data.payload;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await deleteOne("admin/users", id);
      return { id };
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ id, user }, { rejectWithValue }) => {
    try {
      const { data } = await updateOne("admin/users", id, user);
      return data.payload.user;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const getBanUsers = createAsyncThunk(
  "user/getBanUsers",
  async (params = {}, { rejectWithValue }) => {
    try {
      params = { ...params };
      const { data } = await getData("admin/users/banned", params);
      return { data: data.payload.bannedUsers, meta: data.meta };
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);
export const banUser = createAsyncThunk(
  "user/banUser",
  async ({ id, banData }, { rejectWithValue }) => {
    try {
      const { data } = await banOne("admin/users", id, banData);
      return data.payload.user;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);
export const unbanUser = createAsyncThunk(
  "user/unbanUser",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await unbanOne("admin/users", id);
      return data.payload.user;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

const initialState = {
  loading: "",
  users: null,
  bannedUsers: [],
  meta: null,
  bannedUserMeta: null,
  bannedUserError: null,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    [getUsers.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [getUsers.fulfilled]: (state, { payload }) => {
      state.users = payload.payload.users;
      state.meta = payload.meta;
      state.loading = false;
    },
    [getUsers.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    [createUser.fulfilled]: (state, { payload }) => {
      state.users = [...state.users, payload.user];
      state.meta = { ...state.meta, totalDocs: state.meta.totalDocs + 1 };
    },
    [deleteUser.fulfilled]: (state, { payload }) => {
      state.users = state.users.filter((user) => user._id !== payload.id);
      state.meta = { ...state.meta, totalDocs: state.meta.totalDocs - 1 };
    },
    [updateUser.fulfilled]: (state, { payload }) => {
      state.users = state.users.map((user) =>
        user._id == payload._id ? { ...payload } : { ...user }
      );
    },
    [getBanUsers.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [getBanUsers.fulfilled]: (state, { payload }) => {
      const { data, meta } = payload;
      state.bannedUsers = data;
      state.bannedUserMeta = meta;
      state.loading = false;
    },
    [getBanUsers.rejected]: (state, { payload }) => {
      state.bannedUserError = payload;
      state.loading = false;
    },
    [banUser.fulfilled]: (state, { payload }) => {
      state.bannedUsers = [...state.bannedUsers, payload];
      state.bannedUserMeta = {
        ...state.bannedUserMeta,
        totalDocs: state?.bannedUserMeta?.totalDocs + 1,
      };
    },
    [unbanUser.fulfilled]: (state, { payload }) => {
      state.bannedUsers = state.bannedUsers?.filter(
        (user) => user._id !== payload._id
      );
      state.bannedUserMeta = {
        ...state.bannedUserMeta,
        totalDocs: state?.bannedUserMeta?.totalDocs - 1,
      };
    },
  },
});

export default userSlice.reducer;
