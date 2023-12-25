import { render, screen } from '@testing-library/react';
import App from './App';

test('renders App with Header, Routes and Footer', () => {
  render(<App />);

  const headerElement = screen.getByTestId('header');
  expect(headerElement).toBeInTheDocument();

  const routesElementWelcome = screen.getByTestId('welcome-page');
  expect(routesElementWelcome).toBeInTheDocument();

  const footerElement = screen.getByTestId('footer');
  expect(footerElement).toBeInTheDocument();
});
