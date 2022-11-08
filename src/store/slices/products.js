import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createOne,
  deleteOne,
  getData,
  updateOne,
} from "../../services/protectApi";

export const getProducts = createAsyncThunk(
  "product/getProducts",
  async (params = {}, { rejectWithValue }) => {
    try {
      params = { ...params };
      const { data } = await getData("admin/products", params);
      return data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (product, { rejectWithValue }) => {
    try {
      const { data } = await createOne("admin/products", product);
      return data.payload;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await deleteOne("admin/products", id);
      return { id };
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async ({ id, product }, { rejectWithValue }) => {
    try {
      const { data } = await updateOne("admin/products", id, product);
      return data.payload.product;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

const initialState = {
  loading: "",
  products: [],
  requestPlaces: [],
  error: null,
};

const productSlice = createSlice({
  name: "places",
  initialState,
  reducers: {},
  extraReducers: {
    [getProducts.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [getProducts.fulfilled]: (state, { payload }) => {
      state.products = payload.payload.products;
      state.loading = false;
    },
    [getProducts.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    [createProduct.fulfilled]: (state, { payload }) => {
      state.products = [...state.products, payload.product];
    },
    [deleteProduct.fulfilled]: (state, { payload }) => {
      state.products = state.products.filter(
        (place) => place._id !== payload.id
      );
    },
    [updateProduct.fulfilled]: (state, { payload }) => {
      state.products = state.products.map((product) =>
        product._id == payload._id ? { ...payload } : { ...product }
      );
    },
  },
});

export default productSlice.reducer;
