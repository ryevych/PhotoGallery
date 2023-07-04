import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPhoto } from "../../models/IPhoto";

interface FavoritesState {
  favorites: IPhoto[];
}

const initialState: FavoritesState = { favorites: [] };

export const favoritesSlice = createSlice({
  name: "favotires",
  initialState: initialState,
  reducers: {
    addToFavorites(state, action: PayloadAction<IPhoto>) {
      state.favorites.push(action.payload);
    },
    removeFromFavorites(state, action: PayloadAction<number>) {
      const index = state.favorites.findIndex(
        (element) => element.id == action.payload
      );
      if (index >= 0) {
        state.favorites.splice(index, 1);
      }
    },
  },
});

export default favoritesSlice.reducer;
export const favoritesActions = favoritesSlice.actions;