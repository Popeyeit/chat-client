import { createSlice } from '@reduxjs/toolkit';
const initialState = null;
const error = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setError: (_, { payload }) => payload,
    unsetError: (_, { payload }) => payload,
  },
});
const { actions, reducer } = error;
export const { setError, unsetError } = actions;
export default reducer;
