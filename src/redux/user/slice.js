import { createSlice, combineReducers } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  email: '',
};

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    register: (_, { payload }) => payload,
    login: (_, { payload }) => payload,
    current: (_, { payload }) => payload,
    logout: () => initialState,
  },
});

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    getUsers: (_, { payload }) => payload,
  },
});

const token = createSlice({
  name: 'token',
  initialState: null,
  reducers: {
    setToken: (_, { payload }) => payload,
    unsetToken: () => null,
  },
});

export const { setToken, unsetToken } = token.actions;
const { actions, reducer } = authSlice;
export const { register, login, current, logout } = actions;
export const { getUsers } = usersSlice.actions;
export const users = usersSlice.reducer;

export default combineReducers({
  user: reducer,
  token: token.reducer,
});
