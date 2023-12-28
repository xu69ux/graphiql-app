import { act, render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { LanguageContext } from '../contexts/LanguageContext';
import { LoginPage } from '../pages';

describe('LoginPage component', () => {
  let container: HTMLElement;
  test('renders correctly', async () => {
    await act(
      async () =>
        ({ container } = render(
          <Router>
            <LanguageContext.Provider
              value={{ language: 'eng', setLanguage: () => {} }}
            >
              <LoginPage />
            </LanguageContext.Provider>
          </Router>,
        )),
    );

    expect(container).toMatchSnapshot();
  });

  it('renders log in title', async () => {
    await act(async () => {
      render(
        <LanguageContext.Provider
          value={{ language: 'eng', setLanguage: () => {} }}
        >
          <Router>
            <LoginPage />
          </Router>
        </LanguageContext.Provider>,
      );
    });
    expect(screen.getByTestId('login-title')).toBeInTheDocument();
  });

  it('renders log in form', async () => {
    await act(async () => {
      render(
        <LanguageContext.Provider
          value={{ language: 'eng', setLanguage: () => {} }}
        >
          <Router>
            <LoginPage />
          </Router>
        </LanguageContext.Provider>,
      );
    });

    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
  });

  test('renders sign up link', async () => {
    await act(async () => {
      render(
        <Router>
          <LanguageContext.Provider
            value={{ language: 'eng', setLanguage: () => {} }}
          >
            <LoginPage />
          </LanguageContext.Provider>
        </Router>,
      );
    });
    const linkElement = screen.getByTestId('signup-link');
    expect(linkElement).toBeInTheDocument();
  });
});
