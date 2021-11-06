import { createSlice } from '@reduxjs/toolkit';
import data from '../data';

const slice = createSlice({
  name: 'products',
  initialState: {
    data,
    filters: {
      colors: [],
      prices: {
        max: 0,
        min: 0,
      },
    },
  },
  reducers: {
    changeFilters(state, action) {
      state.filters[action.payload.name] = action.payload.value;
    },
  },
});

export const { changeFilters } = slice.actions;

export const selectUniqueColors = ({ products }) =>
  // usa Set para remover valores repetidos
  Array.from(new Set(products.data.map(({ color }) => color)));

export default slice.reducer;
