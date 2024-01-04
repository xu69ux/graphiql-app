import { render } from './test-utils';
import { Header } from '../components';
import { useAuthState } from 'react-firebase-hooks/auth';

jest.mock('react-firebase-hooks/auth');

describe('Header', () => {
  afterEach(() => {
    sessionStorage.clear();
  });

  it('renders without crashing', () => {
    (useAuthState as jest.Mock).mockReturnValue([null, false]);

    render(<Header />);
  });

  it('renders user elements when user is logged in', () => {
    (useAuthState as jest.Mock).mockReturnValue([{ uid: '123' }, false]);
    sessionStorage.setItem('userName', 'Test User');

    const { getByText } = render(<Header />);

    expect(getByText('IDE')).toBeInTheDocument();
    expect(getByText('logout')).toBeInTheDocument();
  });

  it('renders guest elements when user is not logged in', () => {
    (useAuthState as jest.Mock).mockReturnValue([null, false]);

    const { getByText } = render(<Header />);

    expect(getByText('login')).toBeInTheDocument();
    expect(getByText('signup')).toBeInTheDocument();
  });
});
