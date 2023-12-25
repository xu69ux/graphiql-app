import { render, fireEvent } from '@testing-library/react';
import { FallBackUI } from '../components';

Object.defineProperty(window, 'location', {
  value: {
    reload: jest.fn(),
  },
  writable: true,
});

let reload: () => void;

beforeAll(() => {
  reload = window.location.reload;
});

afterAll(() => {
  window.location.reload = reload;
});

describe('FallBackUI', () => {
  it('displays the error message', () => {
    const error = new Error('Test error');
    const { getByText } = render(
      <FallBackUI error={error} resetErrorBoundary={jest.fn()} />,
    );
    expect(getByText('Test error')).toBeInTheDocument();
  });

  it('calls resetErrorBoundary and reloads the page when the button is clicked', () => {
    const error = new Error('Test error');
    const resetErrorBoundary = jest.fn();
    const { getByText } = render(
      <FallBackUI error={error} resetErrorBoundary={resetErrorBoundary} />,
    );

    window.location.reload = jest.fn();

    fireEvent.click(getByText('Reload page'));

    expect(resetErrorBoundary).toHaveBeenCalled();
    expect(window.location.reload).toHaveBeenCalled();
  });
});
