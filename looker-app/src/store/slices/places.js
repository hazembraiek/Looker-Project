import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createOne,
  deleteOne,
  getData,
  updateOne,
} from "../../services/protectApi";

export const getPlaces = createAsyncThunk(
  "places/getPlaces",
  async (params = {}, { rejectWithValue }) => {
    try {
      params = { ...params };
      const { data } = await getData("admin/places", params);
      return data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const getRequestPlaces = createAsyncThunk(
  "places/getRequestPlaces",
  async (params = {}, { rejectWithValue }) => {
    try {
      params = { ...params };
      const { data } = await getData("admin/suggestions", params);
      return data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const createPlace = createAsyncThunk(
  "places/createPlace",
  async (place, { rejectWithValue }) => {
    try {
      console.log({ place });
      const { data } = await createOne("admin/places", place);
      return data.payload;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const deletePlace = createAsyncThunk(
  "places/deletePlace",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await deleteOne("admin/places", id);
      return { id };
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const updatePlace = createAsyncThunk(
  "places/updatePlace",
  async ({ id, place }, { rejectWithValue }) => {
    try {
      const { data } = await updateOne("admin/places", id, place);
      return data.payload.place;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

const initialState = {
  loading: "",
  places: [],
  requestPlaces: [],
  error: null,
};

const placeSlice = createSlice({
  name: "places",
  initialState,
  reducers: {},
  extraReducers: {
    [getPlaces.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [getPlaces.fulfilled]: (state, { payload }) => {
      state.places = payload.payload.places;
      state.loading = false;
    },
    [getPlaces.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    [getRequestPlaces.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [getRequestPlaces.fulfilled]: (state, { payload }) => {
      state.requestPlaces = payload.payload.suggestions;
      state.loading = false;
    },
    [getRequestPlaces.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    [createPlace.fulfilled]: (state, { payload }) => {
      state.places = [...state.places, payload.place];
    },
    [deletePlace.fulfilled]: (state, { payload }) => {
      state.places = state.places.filter((place) => place._id !== payload.id);
    },
    [updatePlace.fulfilled]: (state, { payload }) => {
      state.places = state.places.map((place) =>
        place._id == payload._id ? { ...payload } : { ...place }
      );
    },
  },
});

export default placeSlice.reducer;
