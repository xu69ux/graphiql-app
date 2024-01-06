import { render, fireEvent } from './test-utils';
import { UserComponent } from '@components/index';

describe('UserComponent', () => {
  it('calls logout function when logout button is clicked', () => {
    const { getByText } = render(<UserComponent />);

    const logoutButton = getByText(/logout/i);
    fireEvent.click(logoutButton);
  });
});
