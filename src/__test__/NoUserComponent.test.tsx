import { render, screen } from './test-utils';
import { NoUserComponent } from '@components/index';

describe('NoUserComponent', () => {
  it('renders login and signup links', () => {
    render(<NoUserComponent />);

    const loginLink = screen.getByText(/login/i);
    expect(loginLink).toBeInTheDocument();
    expect(loginLink).toHaveAttribute('href', '/login');

    const signupLink = screen.getByText(/signup/i);
    expect(signupLink).toBeInTheDocument();
    expect(signupLink).toHaveAttribute('href', '/signup');
  });
});
