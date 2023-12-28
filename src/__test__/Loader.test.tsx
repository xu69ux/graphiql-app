import { render, screen } from '@testing-library/react';
import { Loader } from '../components';

test('renders Loader with correct class and testId', () => {
  render(<Loader />);
  const loaderElement = screen.getByTestId('loader');
  expect(loaderElement).toBeInTheDocument();
  expect(loaderElement).toHaveClass('loader');
});
