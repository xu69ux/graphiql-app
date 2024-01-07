import { render, fireEvent } from './test-utils';
import { ThemeContext } from '@contexts/ThemeContext';
import { ModalWindow } from '@components/index';

describe('ModalWindow', () => {
  it('renders correctly when open', () => {
    const onClose = jest.fn();

    const { getByRole, getByText } = render(
      <ThemeContext.Provider value={{ theme: 'light', toggleTheme: () => {} }}>
        <ModalWindow isOpen={true} onClose={onClose} />
      </ThemeContext.Provider>,
    );

    expect(getByRole('button', { name: /close/i })).toBeInTheDocument();
    expect(getByText(/settings/i)).toBeInTheDocument();
  });

  it('does not render when not open', () => {
    const onClose = jest.fn();

    const { queryByRole } = render(
      <ThemeContext.Provider value={{ theme: 'light', toggleTheme: () => {} }}>
        <ModalWindow isOpen={false} onClose={onClose} />
      </ThemeContext.Provider>,
    );

    expect(queryByRole('button', { name: /close/i })).not.toBeInTheDocument();
  });

  it('calls onClose when the close button is clicked', () => {
    const onClose = jest.fn();

    const { getByRole } = render(
      <ThemeContext.Provider value={{ theme: 'light', toggleTheme: () => {} }}>
        <ModalWindow isOpen={true} onClose={onClose} />
      </ThemeContext.Provider>,
    );

    fireEvent.click(getByRole('button', { name: /close/i }));

    expect(onClose).toHaveBeenCalled();
  });
});
