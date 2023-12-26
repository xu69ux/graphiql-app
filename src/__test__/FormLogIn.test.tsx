import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import { LanguageContext } from '../contexts/LanguageContext';
import { FormLogIn } from '../components';

describe('FormLogIn component', () => {
  it('renders correctly', () => {
    const { getByPlaceholderText } = render(
      <LanguageContext.Provider
        value={{ language: 'eng', setLanguage: () => {} }}
      >
        <Router>
          <FormLogIn />
        </Router>
      </LanguageContext.Provider>,
    );

    expect(getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(getByPlaceholderText(/Password/i)).toBeInTheDocument();
  });

  it('submits the form', async () => {
    const { getByPlaceholderText, getByRole } = render(
      <LanguageContext.Provider
        value={{ language: 'eng', setLanguage: () => {} }}
      >
        <Router>
          <FormLogIn />
        </Router>
      </LanguageContext.Provider>,
    );

    act(() => {
      fireEvent.input(getByPlaceholderText(/Email/i), {
        target: { value: 'test@email.com' },
      });
    });

    act(() => {
      fireEvent.input(getByPlaceholderText(/Password/i), {
        target: { value: 'testPassword1!' },
      });
    });

    act(async () => {
      fireEvent.click(getByRole('button'));

      await waitFor(() => {
        expect(getByRole('button')).toBeDisabled();
      });
    });
  });
});
