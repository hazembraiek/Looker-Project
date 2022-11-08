import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createOne, deleteOne, getData } from "../../services/protectApi";

export const getSuggestions = createAsyncThunk(
  "suggesions/getSuggesions",
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

export const acceptSuggestions = createAsyncThunk(
  "suggesions/acceptSuggesions",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await createOne("admin/suggestions/" + id);
      return data.payload;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const deleteSuggestions = createAsyncThunk(
  "suggesions/deleteSuggesions",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await deleteOne("admin/suggestions", id);
      return { id };
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

const initialState = {
  loading: "",
  suggestions: [],
  error: null,
};

const suggestionsSlice = createSlice({
  name: "suggestions",
  initialState,
  reducers: {},
  extraReducers: {
    [getSuggestions.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [getSuggestions.fulfilled]: (state, { payload }) => {
      state.suggestions = JSON.parse(payload.payload.suggestions.data);
      state.loading = false;
    },
    [getSuggestions.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    [acceptSuggestions.fulfilled]: (state, { payload }) => {
      state.suggestions = [...state.suggestions, payload.suggestion];
    },
    [deleteSuggestions.fulfilled]: (state, { payload }) => {
      state.suggestions = state.suggestions.filter(
        (suggestion) => suggestion._id !== payload.id
      );
    },
  },
});

export default suggestionsSlice.reducer;
