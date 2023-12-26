import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import { LanguageContext } from '../contexts/LanguageContext';
import { FormSignUp } from '../components';

describe('FormSignUp component', () => {
  it('renders correctly', () => {
    const { getByPlaceholderText } = render(
      <LanguageContext.Provider
        value={{ language: 'eng', setLanguage: () => {} }}
      >
        <Router>
          <FormSignUp />
        </Router>
      </LanguageContext.Provider>,
    );

    expect(getByPlaceholderText(/Username/i)).toBeInTheDocument();
    expect(getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(getByPlaceholderText(/Password/i)).toBeInTheDocument();
  });

  it('submits the form', async () => {
    const { getByPlaceholderText, getByRole } = render(
      <LanguageContext.Provider
        value={{ language: 'eng', setLanguage: () => {} }}
      >
        <Router>
          <FormSignUp />
        </Router>
      </LanguageContext.Provider>,
    );

    fireEvent.input(getByPlaceholderText(/Username/i), {
      target: { value: 'testuser' },
    });
    fireEvent.input(getByPlaceholderText(/Email/i), {
      target: { value: 'test@email.com' },
    });
    fireEvent.input(getByPlaceholderText(/Password/i), {
      target: { value: 'testPassword1!' },
    });

    act(() => {
      fireEvent.click(getByRole('button'));
    });

    await waitFor(() => {
      expect(getByRole('button')).toBeDisabled();
    });
  });
});
