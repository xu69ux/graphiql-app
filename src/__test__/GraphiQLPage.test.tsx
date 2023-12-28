import { render, screen } from '@testing-library/react';
import { LanguageProvider } from '../contexts/LanguageProvider';
import GraphiQLPage from '../pages/GraphiQLPage';

test('renders GraphiQLPage with initial state', () => {
  render(
    <LanguageProvider>
      <GraphiQLPage />
    </LanguageProvider>,
  );

  expect(screen.getByText(/variables/i)).toBeInTheDocument();
  expect(screen.getByText(/headers/i)).toBeInTheDocument();
  expect(screen.getByTestId('endpoint')).toBeInTheDocument();
  expect(screen.getByTestId('sidebar')).toBeInTheDocument();
  expect(screen.getByTestId('documentation')).toBeInTheDocument();

  expect(screen.getByTestId('endpoint')).toHaveTextContent('Endpoint');
  expect(screen.getByTestId('endpoint-input')).toHaveValue('');
});
