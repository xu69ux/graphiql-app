import { render, screen } from '@testing-library/react';
import { Loader } from '@components/index';

test('renders Loader with correct class and testId', () => {
  render(<Loader />);
  const loaderElement = screen.getByTestId('loader');
  expect(loaderElement).toBeInTheDocument();
  expect(loaderElement).toHaveClass('loader');
});
