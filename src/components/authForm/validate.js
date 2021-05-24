import * as yup from 'yup';

const validate = url => {
  return url === '/login'
    ? yup.object({
        email: yup
          .string('Enter your email')
          .email('Enter a valid email')
          .required('Email is required'),
        password: yup
          .string('Enter your password')
          .min(6, 'Password should be of minimum 6 characters length')
          .max(50, 'Name should be of maximum 50 characters length')
          .required('Password is required')
          .matches(/^(?=.*[A-Z])/, 'Enter a one big letter')
          .matches(/^(?=.*[0-9])/, 'Enter a one number'),
      })
    : yup.object({
        name: yup
          .string('Enter your name')
          .min(2, 'Name should be of minimum 2 characters length')
          .max(30, 'Name should be of maximum 30 characters length')
          .required('Name is required'),
        email: yup
          .string('Enter your email')
          .email('Enter a valid email')
          .required('Email is required'),
        password: yup
          .string('Enter your password')
          .min(6, 'Password should be of minimum 6 characters length')
          .max(50, 'Name should be of maximum 50 characters length')
          .required('Password is required')
          .matches(/^(?=.*[A-Z])/, 'Enter a one big letter')
          .matches(/^(?=.*[0-9])/, 'Enter a one number'),
      });
};

export default validate;
