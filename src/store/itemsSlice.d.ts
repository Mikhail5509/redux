import { ItemsState } from "../store/itemsSlice";

declare module "react-redux" {
  interface DefaultRootState {
    items: ItemsState;
  }
}