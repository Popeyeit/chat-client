import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import user, { users } from './user/slice';
import loader from './loaderSlice';
import error from './errorSlice';
import messages from './messages/slice';
import rooms from './room/slice';

const middleware = getDefaultMiddleware({
  immutableCheck: false,
  serializableCheck: {
    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  },
  thunk: true,
});

const persistConfig = {
  key: 'token',
  storage,
  whitelist: ['token'],
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(persistConfig, user),
    loader,
    error,
    messages,
    users,
    rooms,
  },
  middleware,
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);
