import { render, fireEvent } from '@testing-library/react';
import { Header } from '../components';
import { BrowserRouter as Router } from 'react-router-dom';
import { LanguageContext } from '../contexts/LanguageContext';
import { useAuthState } from 'react-firebase-hooks/auth';

jest.mock('react-firebase-hooks/auth');

describe('Header', () => {
  afterEach(() => {
    sessionStorage.clear();
  });

  it('renders without crashing', () => {
    (useAuthState as jest.Mock).mockReturnValue([null, false]);

    render(
      <LanguageContext.Provider
        value={{ language: 'eng', setLanguage: () => {} }}
      >
        <Router>
          <Header />
        </Router>
      </LanguageContext.Provider>,
    );
  });

  it('renders user elements when user is logged in', () => {
    (useAuthState as jest.Mock).mockReturnValue([{ uid: '123' }, false]);
    sessionStorage.setItem('userName', 'Test User');

    const { getByText } = render(
      <LanguageContext.Provider
        value={{ language: 'eng', setLanguage: () => {} }}
      >
        <Router>
          <Header />
        </Router>
      </LanguageContext.Provider>,
    );

    expect(getByText('hello, Test User!')).toBeInTheDocument();
    expect(getByText('log out')).toBeInTheDocument();
  });

  it('renders guest elements when user is not logged in', () => {
    (useAuthState as jest.Mock).mockReturnValue([null, false]);

    const { getByText } = render(
      <LanguageContext.Provider
        value={{ language: 'eng', setLanguage: () => {} }}
      >
        <Router>
          <Header />
        </Router>
      </LanguageContext.Provider>,
    );

    expect(getByText('log in')).toBeInTheDocument();
    expect(getByText('sign up')).toBeInTheDocument();
  });

  it('changes language when language dropdown is clicked', () => {
    (useAuthState as jest.Mock).mockReturnValue([null, false]);
    const setLanguage = jest.fn();

    const { getByTitle, getByText } = render(
      <LanguageContext.Provider value={{ language: 'eng', setLanguage }}>
        <Router>
          <Header />
        </Router>
      </LanguageContext.Provider>,
    );

    fireEvent.click(getByTitle('change language'));
    fireEvent.click(getByText('rus'));

    expect(setLanguage).toHaveBeenCalledWith('rus');
  });
});
