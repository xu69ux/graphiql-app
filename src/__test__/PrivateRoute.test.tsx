import { render, screen } from './test-utils';
import { PrivateRoute } from '@components/index';

beforeEach(() => {
  Storage.prototype.getItem = jest.fn(() => null);
});

describe('PrivateRoute', () => {
  it('renders Outlet when user is authenticated', () => {
    Storage.prototype.getItem = jest.fn((key) => {
      if (key === 'authInfo' || key === 'userName') {
        return 'mockUser';
      }
      return null;
    });

    render(<PrivateRoute />);

    const outletElement = screen.getByTestId('outlet');
    expect(outletElement).toBeInTheDocument();
  });

  it('renders Navigate when user is not authenticated', () => {
    render(<PrivateRoute />);

    const navigateElement = screen.getByTestId('navigate');
    expect(navigateElement).toBeInTheDocument();
  });
});
