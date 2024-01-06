import { render } from './test-utils';
import WelcomePage from '@pages/WelcomePage';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Link: ({ to, children }) => <a href={to}>{children}</a>,
}));

jest.mock('react-icons/io5', () => ({
  IoChevronForward: () => <div>Mock Icon</div>,
}));

describe('WelcomePage', () => {
  it('renders the WelcomePage component', () => {
    const { container } = render(<WelcomePage />);

    expect(container).toMatchSnapshot();
  });

  it('renders welcome message', () => {
    const { getByTestId } = render(<WelcomePage />);

    expect(getByTestId('graphiqlide')).toBeInTheDocument();
  });

  it('renders login and signup links', async () => {
    const { container } = render(<WelcomePage />);

    const loginLink = container.querySelector('a[href="/login"]');
    expect(loginLink).toHaveTextContent(/log\s*in/i);

    const signupLink = container.querySelector('a[href="/signup"]');
    expect(signupLink).toHaveTextContent(/sign\s*up/i);
  });
});
