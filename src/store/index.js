import { configureStore } from "@reduxjs/toolkit";
import places from "./slices/places";
import products from "./slices/products";
import categories from "./slices/categories";
import suggestions from "./slices/suggestions";

const store = configureStore({
  reducer: {
    places,
    products,
    categories,
    suggestions,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
