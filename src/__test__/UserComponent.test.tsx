import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserComponent } from '../components';
import { LanguageProvider } from '../contexts/LanguageProvider';

describe('UserComponent', () => {
  it('calls logout function when logout button is clicked', () => {
    const mockUser = {
      displayName: 'Test user',
    };

    const { getByText } = render(
      <Router>
        <LanguageProvider>
          <UserComponent user={mockUser} />
        </LanguageProvider>
      </Router>,
    );

    const logoutButton = getByText(/logout/i);
    fireEvent.click(logoutButton);
  });
});
