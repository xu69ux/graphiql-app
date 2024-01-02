import { act, render, screen } from './test-utils';
import LoginPage from '../pages/LoginPage';

describe('LoginPage component', () => {
  test('renders correctly', async () => {
    await act(async () => {
      const { container } = render(<LoginPage />);
      expect(container).toMatchSnapshot();
    });
  });

  test('renders log in title', async () => {
    await act(async () => {
      render(<LoginPage />);
    });
    expect(screen.getByTestId('login-title')).toBeInTheDocument();
  });

  test('renders log in form', async () => {
    await act(async () => {
      render(<LoginPage />);
    });

    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
  });

  test('renders sign up link', async () => {
    await act(async () => {
      render(<LoginPage />);
    });
    const linkElement = screen.getByTestId('signup-link');
    expect(linkElement).toBeInTheDocument();
  });
});
