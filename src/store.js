import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from "./store/itemsSlice.js";

const store = configureStore({
  reducer: {
    items: itemsReducer,
  },
});

export default store;
