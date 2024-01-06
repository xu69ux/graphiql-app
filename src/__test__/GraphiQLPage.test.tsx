import { act, fireEvent, render, screen, waitFor } from './test-utils';
import GraphiQLPage from '@pages/GraphiQLPage';
import axios from 'axios';

jest.mock('axios');

describe('GraphiQLPage page', () => {
  const mockResult = {
    data: {
      data: {
        __schema: {
          user: {
            id: 1,
            name: 'John Doe',
            email: 'john.doe@example.com',
          },
        },
      },
    },
  };
  let axiosPostSpy: jest.SpyInstance<Promise<unknown>>;

  beforeEach(() => {
    axiosPostSpy = jest.spyOn(axios, 'post');
    axiosPostSpy.mockResolvedValue(mockResult);
  });

  afterEach(() => {
    axiosPostSpy.mockRestore();
  });

  test('renders GraphiQLPage with initial state', async () => {
    await act(async () => {
      render(<GraphiQLPage />);
    });

    expect(screen.getByText(/variables/i)).toBeInTheDocument();
    expect(screen.getByText(/headers/i)).toBeInTheDocument();
    expect(screen.getByTestId('endpoint')).toBeInTheDocument();
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    expect(screen.getByTestId('documentation')).toBeInTheDocument();
    expect(screen.getByTestId('endpoint')).toHaveTextContent('Endpoint');
    expect(screen.getByTestId('endpoint-input')).toHaveValue('');
  });

  test('adds a new tab when clicking the "Add Tab" button', async () => {
    render(<GraphiQLPage />);
    act(() => {
      fireEvent.click(screen.getByTitle('add tab'));
    });
    await waitFor(() => {
      expect(screen.getByDisplayValue('untitled 2')).toBeInTheDocument();
    });
  });
});
