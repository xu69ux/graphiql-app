import { render, fireEvent } from './test-utils';
import { UserComponent } from '../components';

describe('UserComponent', () => {
  it('calls logout function when logout button is clicked', () => {
    const mockUser = {
      displayName: 'Test user',
    };

    const { getByText } = render(<UserComponent user={mockUser} />);

    const logoutButton = getByText(/logout/i);
    fireEvent.click(logoutButton);
  });
});
