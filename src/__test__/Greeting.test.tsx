import { render, screen } from '@testing-library/react';
import { Greeting } from '../components';
import { LanguageProvider } from '../contexts/LanguageProvider';

test('renders Loader when isLoading is true', () => {
  const mockName = 'John';

  render(
    <LanguageProvider>
      <Greeting isLoading={true} name={mockName} />
    </LanguageProvider>,
  );
  const loaderElement = screen.getByTestId('loader');
  expect(loaderElement).toBeInTheDocument();
});

test('renders greeting with name when name is provided', () => {
  render(
    <LanguageProvider>
      <Greeting name='John' isLoading={false} />
    </LanguageProvider>,
  );
  const greetingElement = screen.getByText(/John/);
  expect(greetingElement).toBeInTheDocument();
});

test('renders greeting with noName when name is not provided', () => {
  render(
    <LanguageProvider>
      <Greeting isLoading={false} name={undefined} />
    </LanguageProvider>,
  );
  const greetingElement = screen.getByText('hello, username!');
  expect(greetingElement).toBeInTheDocument();
});
