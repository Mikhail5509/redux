import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Item {
  id: string;
  text: string;
  price: number;
}

interface ItemsState {
  list: Item[];
}

const initialState: ItemsState = {
  list: [
    { id: '1', text: 'Пример товара', price: 100 }
  ],
};

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Omit<Item, 'id'>>) => {
      const newItem = {
        id: Date.now().toString(),
        ...action.payload
      };
      state.list.push(newItem);
    },
    editItem: (state, action: PayloadAction<Item>) => {
      const index = state.list.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
    deleteItem: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter(item => item.id !== action.payload);
    },
  },
});

export const { addItem, editItem, deleteItem } = itemsSlice.actions;
export default itemsSlice.reducer;