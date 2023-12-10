import * as yup from 'yup';

export const SCHEMA = yup.object().shape({
  username: yup.string().nullable(''),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .test(
      'password-strength',
      'Password must meet the strength criteria',
      (value) => {
        if (!value) return true;

        const errors: string[] = [];
        if (!/(?=.*[a-z])/.test(value))
          errors.push('at least one lowercase letter');
        if (!/(?=.*[A-Z])/.test(value))
          errors.push('at least one uppercase letter');
        if (!/(?=.*[0-9])/.test(value)) errors.push('at least one number');
        if (!/(?=.*[!@#$%^&*])/.test(value))
          errors.push('at least one special character');
        if (value.length < 8) errors.push('at least 8 characters long');

        return errors.length === 0
          ? true
          : new yup.ValidationError(
              `Password must have: ${errors.join(', ')}`,
              value,
              'password',
            );
      },
    ),
});
