import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createOne,
  deleteOne,
  getData,
  updateOne,
} from "../../services/protectApi";

export const getCategories = createAsyncThunk(
  "Categories/getCategories",
  async (params = {}, { rejectWithValue }) => {
    try {
      params = { ...params };
      const { data } = await getData("admin/categories", params);
      return data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const createCategory = createAsyncThunk(
  "Categories/createCategory",
  async (category, { rejectWithValue }) => {
    try {
      const { data } = await createOne("admin/categories", category);
      return data.payload;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "Categories/deleteCategory",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await deleteOne("admin/categories", id);
      return { id };
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const updateCategory = createAsyncThunk(
  "Categories/updateCategory",
  async ({ id, category }, { rejectWithValue }) => {
    try {
      const { data } = await updateOne("admin/categories", id, category);
      return data.payload.category;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

const initialState = {
  loading: "",
  categories: [],
  requestPlaces: [],
  error: null,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: {
    [getCategories.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [getCategories.fulfilled]: (state, { payload }) => {
      state.categories = payload.payload.categories;
      state.loading = false;
    },
    [getCategories.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },

    [createCategory.fulfilled]: (state, { payload }) => {
      state.categories = [...state.categories, payload.category];
    },
    [deleteCategory.fulfilled]: (state, { payload }) => {
      state.categories = state.categories.filter(
        (category) => category._id !== payload.id
      );
    },
    [updateCategory.fulfilled]: (state, { payload }) => {
      state.categories = state.categories.map((category) =>
        category._id == payload._id ? { ...payload } : { ...category }
      );
    },
  },
});

export default categoriesSlice.reducer;
