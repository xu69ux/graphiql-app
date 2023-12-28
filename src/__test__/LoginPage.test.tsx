import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { LanguageContext } from '../contexts/LanguageContext';
import { LoginPage } from '../pages';

describe('LoginPage component', () => {
  test('renders correctly', () => {
    const { container } = render(
      <Router>
        <LanguageContext.Provider
          value={{ language: 'eng', setLanguage: () => {} }}
        >
          <LoginPage />
        </LanguageContext.Provider>
      </Router>,
    );

    expect(container).toMatchSnapshot();
  });

  it('renders log in title', () => {
    const { getByTestId } = render(
      <LanguageContext.Provider
        value={{ language: 'eng', setLanguage: () => {} }}
      >
        <Router>
          <LoginPage />
        </Router>
      </LanguageContext.Provider>,
    );

    expect(getByTestId('login-title')).toBeInTheDocument();
  });

  it('renders log in form', () => {
    const { getByPlaceholderText } = render(
      <LanguageContext.Provider
        value={{ language: 'eng', setLanguage: () => {} }}
      >
        <Router>
          <LoginPage />
        </Router>
      </LanguageContext.Provider>,
    );

    expect(getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(getByPlaceholderText(/Password/i)).toBeInTheDocument();
  });

  test('renders sign up link', () => {
    const { getByTestId } = render(
      <Router>
        <LanguageContext.Provider
          value={{ language: 'eng', setLanguage: () => {} }}
        >
          <LoginPage />
        </LanguageContext.Provider>
      </Router>,
    );

    const linkElement = getByTestId('signup-link');
    expect(linkElement).toBeInTheDocument();
  });
});
