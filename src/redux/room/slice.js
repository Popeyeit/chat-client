import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    getRooms: (_, { payload }) => payload,
    create: (state, { payload }) => [...state, payload],
    reset: () => initialState,
    change: (state, { payload }) =>
      state.map(room =>
        room._id === payload.id
          ? {
              ...room,
              lastMessage: payload.lastMessage,
            }
          : room,
      ),
  },
});

const { actions, reducer } = roomSlice;

export const { getRooms, create, reset, change } = actions;

export default reducer;
