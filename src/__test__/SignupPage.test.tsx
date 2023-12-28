import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { LanguageContext } from '../contexts/LanguageContext';
import SignupPage from '../pages/SignupPage';

describe('SignUpPage component', () => {
  test('renders correctly', () => {
    const { container } = render(
      <Router>
        <LanguageContext.Provider
          value={{ language: 'eng', setLanguage: () => {} }}
        >
          <SignupPage />
        </LanguageContext.Provider>
      </Router>,
    );

    expect(container).toMatchSnapshot();
  });

  it('renders sign up title', () => {
    const { getByTestId } = render(
      <LanguageContext.Provider
        value={{ language: 'eng', setLanguage: () => {} }}
      >
        <Router>
          <SignupPage />
        </Router>
      </LanguageContext.Provider>,
    );

    expect(getByTestId('signup-title')).toBeInTheDocument();
  });

  it('renders sign up form', () => {
    const { getByPlaceholderText } = render(
      <LanguageContext.Provider
        value={{ language: 'eng', setLanguage: () => {} }}
      >
        <Router>
          <SignupPage />
        </Router>
      </LanguageContext.Provider>,
    );

    expect(getByPlaceholderText(/Username/i)).toBeInTheDocument();
    expect(getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(getByPlaceholderText(/Password/i)).toBeInTheDocument();
  });

  test('renders login link', () => {
    const { getByTestId } = render(
      <Router>
        <LanguageContext.Provider
          value={{ language: 'eng', setLanguage: () => {} }}
        >
          <SignupPage />
        </LanguageContext.Provider>
      </Router>,
    );

    const linkElement = getByTestId('login-link');
    expect(linkElement).toBeInTheDocument();
  });
});
