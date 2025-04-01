import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Явно экспортируем интерфейсы
export interface Item {
  id: number;
  text: string;
  price: number;
}

export interface ItemsState {
  list: Item[];
}

const initialState: ItemsState = {
  list: [],
};

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Omit<Item, 'id'>>) => {
      const newItem = { id: Date.now(), ...action.payload };
      state.list.push(newItem);
    },
    editItem: (state, action: PayloadAction<Item>) => {
      const index = state.list.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
    deleteItem: (state, action: PayloadAction<number>) => {
      state.list = state.list.filter(item => item.id !== action.payload);
    },
  },
});

export const { addItem, editItem, deleteItem } = itemsSlice.actions;
export default itemsSlice.reducer;