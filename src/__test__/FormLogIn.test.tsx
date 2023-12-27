import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import { LanguageContext } from '../contexts/LanguageContext';
import { FormLogIn } from '../components';
import * as firebase from '../utils/firebase';

describe('FormLogIn component', () => {
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
            <FormLogIn />
          </Router>
        </LanguageContext.Provider>,
      );
    });
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
  });

  it('submits the form', async () => {
    const logInWithEmailAndPassword = jest
      .spyOn(firebase, 'logInWithEmailAndPassword')
      .mockResolvedValue('success');
    await act(async () => {
      render(
        <LanguageContext.Provider
          value={{ language: 'eng', setLanguage: () => {} }}
        >
          <Router>
            <FormLogIn />
          </Router>
        </LanguageContext.Provider>,
      );
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
      expect(logInWithEmailAndPassword).toHaveBeenCalledWith(
        'test@email.com',
        'testPassword1!',
      );
    });
  });
});
