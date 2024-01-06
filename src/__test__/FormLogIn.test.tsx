import { render, fireEvent, waitFor, screen } from './test-utils';
import { act } from 'react-dom/test-utils';
import { FormLogIn } from '@components/index';
import * as firebase from '@utils/firebase';

describe('FormLogIn component', () => {
  const useAuthState = jest.fn();
  useAuthState.mockReturnValue([false]);
  afterEach(jest.clearAllMocks);
  it('renders correctly', async () => {
    await act(async () => {
      render(<FormLogIn />);
    });
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
  });

  it('submits the form', async () => {
    const logInWithEmailAndPassword = jest
      .spyOn(firebase, 'logInWithEmailAndPassword')
      .mockResolvedValue('success');
    await act(async () => {
      render(<FormLogIn />);
    });

    fireEvent.input(screen.getByPlaceholderText(/Email/i), {
      target: { value: 'test@email.com' },
    });

    fireEvent.input(screen.getByPlaceholderText(/Password/i), {
      target: { value: 'testPassword1!' },
    });

    act(() => {
      fireEvent.click(screen.getByRole('button'));
    });
    await waitFor(() => {
      expect(logInWithEmailAndPassword).toHaveBeenCalledWith(
        'test@email.com',
        'testPassword1!',
      );
    });
  });
});
