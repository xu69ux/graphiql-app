import React from 'react';
import { render, fireEvent, act } from './test-utils';
import { ThemeProvider } from '@contexts/ThemeProvider';
import { ThemeContext } from '@contexts/ThemeContext';

jest.mock('@hooks/useLanguage', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue({ language: 'eng' }),
}));

describe('ThemeProvider', () => {
  it('toggles theme correctly', () => {
    const TestComponent = () => {
      const { theme, toggleTheme } = React.useContext(ThemeContext);
      return (
        <div>
          <div data-testid='theme'>{theme}</div>
          <button onClick={toggleTheme}>Toggle theme</button>
        </div>
      );
    };

    const { getByTestId, getByText } = render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );

    expect(getByTestId('theme').textContent).toBe('dark');

    act(() => {
      fireEvent.click(getByText('Toggle theme'));
    });

    expect(getByTestId('theme').textContent).toBe('crazy');
  });
});
