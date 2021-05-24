import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createRoomOperation } from '../../redux/room/operations';
import { useFormik } from 'formik';
import { setError } from '../../redux/errorSlice';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import styles from './styles.module.css';

const RoomForm = ({ closeModal }) => {
  const error = useSelector(state => state.error);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: '',
    },

    onSubmit: values => {
      dispatch(createRoomOperation({ ...values }));
      closeModal();
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
      <h2>Create room for chatting</h2>
      {error && <div className={styles.error}>{error}</div>}
      <TextField
        fullWidth
        id="name"
        name="name"
        label="Name of room"
        type="text"
        value={formik.values.name}
        onChange={formik.handleChange}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
      />

      <Button color="primary" variant="contained" fullWidth type="submit">
        Create Room
      </Button>
    </form>
  );
};

export default RoomForm;
