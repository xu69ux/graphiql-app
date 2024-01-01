import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { NoUserComponent } from '../components';
import { LanguageProvider } from '../contexts/LanguageProvider';

describe('NoUserComponent', () => {
  it('renders login and signup links', () => {
    render(
      <Router>
        <LanguageProvider>
          <NoUserComponent />
        </LanguageProvider>
      </Router>,
    );

    const loginLink = screen.getByText(/login/i);
    expect(loginLink).toBeInTheDocument();
    expect(loginLink).toHaveAttribute('href', '/login');

    const signupLink = screen.getByText(/signup/i);
    expect(signupLink).toBeInTheDocument();
    expect(signupLink).toHaveAttribute('href', '/signup');
  });
});
