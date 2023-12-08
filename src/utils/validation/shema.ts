import * as yup from 'yup';

export const SCHEMA = yup.object().shape({
  username: yup.string().notRequired(),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(24)
    .matches(/[A-Za-z]/, 'Password must contain at least one letter')
    .matches(/[0-9]/, 'Password should have at least 1 digit')
    .matches(/[@$!%*#?&]/, 'Password should have at least 1 special character')
    .required(),
});
