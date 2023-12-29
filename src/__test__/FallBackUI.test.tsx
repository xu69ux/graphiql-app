import { render, fireEvent, act } from '@testing-library/react';
import { FallBackUI } from '../components';
import { LanguageProvider } from '../contexts/LanguageProvider';

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
      <LanguageProvider>
        <FallBackUI error={error} resetErrorBoundary={jest.fn()} />
      </LanguageProvider>,
    );
    expect(getByText('Test error')).toBeInTheDocument();
  });

  it('calls resetErrorBoundary and reloads the page when the button is clicked', () => {
    const error = new Error('Test error');
    const resetErrorBoundary = jest.fn();
    const { getByText } = render(
      <LanguageProvider>
        <FallBackUI error={error} resetErrorBoundary={resetErrorBoundary} />
      </LanguageProvider>,
    );

    window.location.reload = jest.fn();
    act(() => {
      fireEvent.click(getByText('Reload page'));
    });
    expect(resetErrorBoundary).toHaveBeenCalled();
    expect(window.location.reload).toHaveBeenCalled();
  });
});
