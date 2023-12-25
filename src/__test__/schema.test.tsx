import * as yup from 'yup';
import { getSchema } from '../utils/validation/schema';

describe('Validation Schema', () => {
  const language = 'en';
  const schema = getSchema(language);

  it('should validate a valid object', async () => {
    const validObject = {
      username: 'user',
      email: 'user@loh.com',
      password: 'Password1!',
    };
    await expect(schema.validate(validObject)).resolves.toEqual(validObject);
  });

  it('should not validate an object with an invalid email', async () => {
    const invalidObject = {
      username: 'user',
      email: 'not an email',
      password: 'Password1!',
    };
    await expect(schema.validate(invalidObject)).rejects.toThrow(
      yup.ValidationError,
    );
  });

  it('should not validate an object with a weak password', async () => {
    const invalidObject = {
      username: 'user',
      email: 'user@loh.com',
      password: 'password',
    };
    await expect(schema.validate(invalidObject)).rejects.toThrow(
      yup.ValidationError,
    );
  });
});
