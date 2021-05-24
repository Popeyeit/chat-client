import api from '../../api/api';
import { getRooms, create, change } from './slice';
import { get } from '../messages/slice';
import { setLoader, unsetLoader } from '../loaderSlice';
import { setError, unsetError } from '../errorSlice';

export const getRoomsOperation = () => async (dispatch, getState) => {
  const {
    auth: { token: hasToken },
  } = getState();
  if (!hasToken) {
    return;
  }
  try {
    dispatch(unsetError(null));
    dispatch(setLoader(true));
    api.setToken(hasToken);
    const res = await api.requestGet('/rooms');
    dispatch(getRooms(res.data));
  } catch (error) {
    if (error?.response?.status === 400) {
      dispatch(setError('wrong request'));
      return;
    }
  } finally {
    dispatch(unsetLoader(false));
  }
};

export const createRoomOperation = item => async dispatch => {
  try {
    const res = await api.requestPost('/rooms/new', item);

    dispatch(create(res.data));
  } catch (error) {
    if (error?.response?.status === 400) {
      dispatch(setError('wrong request'));
      return;
    }
  } finally {
  }
};

export const getRoomByIdOperation = id => async dispatch => {
  try {
    const res = await api.requestGet(`/rooms/${id}`);

    dispatch(get(res.data));
  } catch (error) {
    if (error?.response?.status === 400) {
      dispatch(setError('wrong request'));
      return;
    }
  } finally {
  }
};

export const changeRoomOperation = (id, lastMessage) => async dispatch => {
  try {
    await api.requestPath(`/rooms/change/${id}`, { lastMessage });
    dispatch(change({ id, lastMessage }));
  } catch (error) {
    if (error?.response?.status === 400) {
      dispatch(setError('wrong request'));
      return;
    }
  } finally {
  }
};
