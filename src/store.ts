import { configureStore } from "@reduxjs/toolkit";
import itemsReducer, { ItemsState } from "./store/itemsSlice"; // Явно импортируем ItemsState

export const store = configureStore({
  reducer: {
    items: itemsReducer,
  },
});

// Экспортируем типы после создания store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;