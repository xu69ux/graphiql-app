import { act, render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { LanguageContext } from '../contexts/LanguageContext';
import SignupPage from '../pages/SignupPage';

describe('SignUpPage component', () => {
  let container: HTMLElement;
  test('renders correctly', async () => {
    await act(
      async () =>
        ({ container } = render(
          <Router>
            <LanguageContext.Provider
              value={{ language: 'eng', setLanguage: () => {} }}
            >
              <SignupPage />
            </LanguageContext.Provider>
          </Router>,
        )),
    );

    expect(container).toMatchSnapshot();
  });

  it('renders sign up title', async () => {
    await act(async () => {
      render(
        <LanguageContext.Provider
          value={{ language: 'eng', setLanguage: () => {} }}
        >
          <Router>
            <SignupPage />
          </Router>
        </LanguageContext.Provider>,
      );
    });

    expect(screen.getByTestId('signup-title')).toBeInTheDocument();
  });

  it('renders sign up form', async () => {
    await act(async () => {
      render(
        <LanguageContext.Provider
          value={{ language: 'eng', setLanguage: () => {} }}
        >
          <Router>
            <SignupPage />
          </Router>
        </LanguageContext.Provider>,
      );
    });

    expect(screen.getByPlaceholderText(/Username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
  });

  test('renders login link', async () => {
    await act(async () => {
      render(
        <Router>
          <LanguageContext.Provider
            value={{ language: 'eng', setLanguage: () => {} }}
          >
            <SignupPage />
          </LanguageContext.Provider>
        </Router>,
      );
    });
    const linkElement = screen.getByTestId('login-link');
    expect(linkElement).toBeInTheDocument();
  });
});
