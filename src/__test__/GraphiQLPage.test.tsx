import { render, screen } from '@testing-library/react';
import { GraphiQLPage } from '../pages';

test('renders GraphiQLPage with initial state', () => {
  render(<GraphiQLPage />);

  expect(screen.getByText(/variables/i)).toBeInTheDocument();
  expect(screen.getByText(/headers/i)).toBeInTheDocument();
  expect(screen.getByTestId('endpoint')).toBeInTheDocument();
  expect(screen.getByTestId('sidebar')).toBeInTheDocument();
  expect(screen.getByTestId('documentation')).toBeInTheDocument();

  expect(screen.getByTestId('endpoint')).toHaveTextContent('Endpoint');
  expect(screen.getByTestId('endpoint-input')).toHaveValue('');
});
