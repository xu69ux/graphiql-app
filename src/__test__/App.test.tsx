import { render, screen } from '@testing-library/react';
import React from 'react';
import App from '../App';

test('renders App with Header, Routes and Footer', async () => {
  render(
    <React.Suspense fallback={<div>Loading...</div>}>
      <App />
    </React.Suspense>,
  );

  const headerElement = await screen.findByTestId('header');
  expect(headerElement).toBeInTheDocument();

  const routesElementWelcome = await screen.findByTestId('welcome-page');
  expect(routesElementWelcome).toBeInTheDocument();

  const footerElement = await screen.findByTestId('footer');
  expect(footerElement).toBeInTheDocument();
});
