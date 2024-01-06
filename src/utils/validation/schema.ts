import * as yup from 'yup';
import { translations } from '@contexts/translations';

export const getSchema = (language) => {
  return yup.object().shape({
    username: yup.string().nullable(''),
    email: yup
      .string()
      .email(translations[language]?.emailInvalid)
      .required(translations[language]?.emailRequired),
    password: yup
      .string()
      .required(translations[language]?.passwordRequired)
      .test(
        'password-strength',
        translations[language]?.passwordInvalid,
        (value) => {
          if (!value) return true;

          const errors: string[] = [];
          if (!/(?=.*[a-z])/.test(value))
            errors.push(
              translations[language]?.passwordInvalidCriteriaLowercase,
            );
          if (!/(?=.*[A-Z])/.test(value))
            errors.push(
              translations[language]?.passwordInvalidCriteriaUppercase,
            );
          if (!/(?=.*[0-9])/.test(value))
            errors.push(translations[language]?.passwordInvalidCriteriaNumber);
          if (!/(?=.*[!@#$%^&*])/.test(value))
            errors.push(translations[language]?.passwordInvalidCriteriaSpecial);
          if (value.length < 8)
            errors.push(translations[language]?.passwordInvalidCriteriaLength);

          return errors.length === 0
            ? true
            : new yup.ValidationError(
                `${translations[language]
                  ?.passwordInvalidCriteria} ${errors.join(', ')}`,
                value,
                'password',
              );
        },
      ),
  });
};
