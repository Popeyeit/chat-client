import api from '../../api/api';
import {
  register,
  login,
  current,
  logout,
  setToken,
  unsetToken,
  getUsers,
} from './slice';
import { reset } from '../messages/slice';
import { setLoader, unsetLoader } from '../loaderSlice';
import { setError } from '../errorSlice';
export const registerOperation = data => async dispatch => {
  try {
    dispatch(setLoader(true));
    const res = await api.requestPost('/register', data);

    dispatch(register(res.data.user));
    dispatch(setToken(res.data.token));
    api.setToken(res.data.token);
  } catch (error) {
    if (error?.response?.status === 409) {
      dispatch(setError('this email is already registered'));
    }
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

export const loginOperation = data => async dispatch => {
  try {
    dispatch(setLoader(true));

    const res = await api.requestPost('/login', data);
    dispatch(login(res.data.user));
    dispatch(setToken(res.data.token));
    api.setToken(res.data.token);
  } catch (error) {
    if (error?.response?.status === 400) {
      dispatch(setError('wrong request'));
      return;
    }
    if (error?.response?.status === 500) {
      dispatch(setError('server problems'));
      return;
    }
    dispatch(setError('wrong login or password'));
  } finally {
    dispatch(unsetLoader(false));
  }
};
export const getCurrentUserOperation = () => async (dispatch, getState) => {
  const {
    auth: { token: hasToken },
  } = getState();
  if (!hasToken) {
    return;
  }
  try {
    dispatch(setLoader(true));
    api.setToken(hasToken);
    const res = await api.requestGet('/currentUser');
    dispatch(current(res.data));
  } catch (error) {
    if (error?.response?.status === 401) {
      api.unsetToken();
      dispatch(logout());
      dispatch(unsetToken());

      return;
    }
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

export const logoutOperation = () => async dispatch => {
  try {
    await api.requestPost('/logout');
    dispatch(logout());
    dispatch(unsetToken());
    api.unsetToken();
    dispatch(reset());
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

export const getAllUserOperation = () => async (dispatch, getState) => {
  const {
    auth: { token: hasToken },
  } = getState();
  if (!hasToken) {
    return;
  }
  try {
    setLoader(true);
    setError(null);
    api.setToken(hasToken);
    const res = await api.requestGet('/users');
    dispatch(getUsers(res.data));
  } catch (error) {
    if (error?.response?.status === 400) {
      dispatch(setError('wrong request'));
      return;
    }
    if (error?.response?.status === 500) {
      dispatch(setError('server problems'));
    }
  } finally {
    setLoader(false);
  }
};
