import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import { LanguageContext } from '../contexts/LanguageContext';
import { FormSignUp } from '../components';
import * as firebase from '../utils/firebase';

describe('FormSignUp component', () => {
  const useAuthState = jest.fn();
  useAuthState.mockReturnValue([false]);
  afterEach(jest.clearAllMocks);
  it('renders correctly', async () => {
    await act(async () => {
      render(
        <LanguageContext.Provider
          value={{ language: 'eng', setLanguage: () => {} }}
        >
          <Router>
            <FormSignUp />
          </Router>
        </LanguageContext.Provider>,
      );
    });
    expect(screen.getByPlaceholderText(/Username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
  });

  it('submits the form', async () => {
    const registerWithEmailAndPassword = jest
      .spyOn(firebase, 'registerWithEmailAndPassword')
      .mockResolvedValue('success');
    act(() => {
      render(
        <LanguageContext.Provider
          value={{ language: 'eng', setLanguage: () => {} }}
        >
          <Router>
            <FormSignUp />
          </Router>
        </LanguageContext.Provider>,
      );
    });

    fireEvent.input(screen.getByPlaceholderText(/Username/i), {
      target: { value: 'testuser' },
    });

    fireEvent.input(screen.getByPlaceholderText(/Email/i), {
      target: { value: 'test@email.com' },
    });

    fireEvent.input(screen.getByPlaceholderText(/Password/i), {
      target: { value: 'testPassword1!' },
    });

    act(() => {
      fireEvent.click(screen.getByRole('button'));
    });

    await waitFor(() => {
      expect(registerWithEmailAndPassword).toHaveBeenCalledWith(
        'testuser',
        'test@email.com',
        'testPassword1!',
      );
    });
  });
});
