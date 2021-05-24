import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    get: (_, { payload }) => payload,
    create: (state, { payload }) => [...state, payload],
    reset: () => initialState,
  },
});

const { actions, reducer } = messageSlice;

export const { get, create, reset } = actions;

export default reducer;
