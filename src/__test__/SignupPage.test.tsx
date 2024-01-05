import { act, render, screen } from './test-utils';
import SignupPage from '../pages/SignupPage';

describe('SignUpPage component', () => {
  test('renders correctly', async () => {
    await act(async () => {
      const { container } = render(<SignupPage />);
      expect(container).toMatchSnapshot();
    });
  });

  test('renders sign up title', async () => {
    await act(async () => {
      render(<SignupPage />);
    });
    expect(screen.getByTestId('signup-title')).toBeInTheDocument();
  });

  test('renders sign up form', async () => {
    await act(async () => {
      render(<SignupPage />);
    });
    expect(screen.getByPlaceholderText(/Username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
  });

  test('renders login link', async () => {
    await act(async () => {
      render(<SignupPage />);
    });
    const linkElement = screen.getByTestId('login-link');
    expect(linkElement).toBeInTheDocument();
  });
});
