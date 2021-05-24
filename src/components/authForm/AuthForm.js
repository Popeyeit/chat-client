import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { NavLink } from 'react-router-dom';
import { registerOperation, loginOperation } from '../../redux/user/operations';
import { setError } from '../../redux/errorSlice';
import validationSchema from './validate';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import styles from './styles.module.css';

const AuthForm = ({ url = '/login' }) => {
  const error = useSelector(state => state.error);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      name: '',
    },
    validationSchema: validationSchema(url),
    onSubmit: values => {
      url === '/login'
        ? dispatch(
            loginOperation({ email: values.email, password: values.password }),
          )
        : dispatch(registerOperation({ ...values }));
    },
  });

  useEffect(() => {
    if (!error) {
      return;
    }
    setTimeout(() => {
      dispatch(setError(null));
    }, 3000);
  }, [error, dispatch]);

  return (
    <form onSubmit={formik.handleSubmit} className={styles.form}>
      <h2>{url === '/login' ? 'Sign in' : 'Sign up'}</h2>
      {error && <div className={styles.error}>{error}</div>}
      <TextField
        fullWidth
        id="email"
        name="email"
        label="Email"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />
      {url === '/login' ? null : (
        <TextField
          fullWidth
          id="name"
          name="name"
          label="Name"
          type="text"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
      )}

      <TextField
        fullWidth
        id="password"
        name="password"
        label="Password"
        type="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
      />
      <Button color="primary" variant="contained" fullWidth type="submit">
        {url === '/login' ? 'Sign in' : 'Sign up'}
      </Button>
      <div>
        <NavLink
          to={url === '/login' ? '/register' : '/login'}
          className={styles.link}
        >
          {url === '/login' ? 'Sign up' : 'Sign in'}
        </NavLink>
      </div>
    </form>
  );
};

export default AuthForm;
