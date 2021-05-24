import api from '../../api/api';
import { get } from './slice';
import { setLoader, unsetLoader } from '../loaderSlice';
import { setError, unsetError } from '../errorSlice';

export const getMessagesByIdOperation = id => async (dispatch, getState) => {
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
    const res = await api.requestGet(`/messages/${id}`);
    dispatch(get(res.data));
  } catch (error) {
    if (error?.response?.status === 400) {
      dispatch(setError('wrong request'));
      return;
    }
    if (error?.response?.status === 500) {
      dispatch(setError('server problems'));
    }
  } finally {
    dispatch(unsetLoader(false));
  }
};

export const createMessageOperation = item => async dispatch => {
  try {
    await api.requestPost('/messages', item);
  } catch (error) {
    if (error?.response?.status === 400) {
      dispatch(setError('wrong request'));
      return;
    }
    if (error?.response?.status === 500) {
      dispatch(setError('server problems'));
    }
  } finally {
  }
};
