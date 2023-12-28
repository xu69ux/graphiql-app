import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { GraphiQLPage } from '../pages';
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
    axiosPostSpy.mockRestore();
  });

  test('adds a new tab when clicking the "Add Tab" button', async () => {
    render(<GraphiQLPage />);

    fireEvent.click(screen.getByText('add tab'));

    await waitFor(() => {
      expect(screen.getByDisplayValue('untitled 2')).toBeInTheDocument();
    });
    axiosPostSpy.mockRestore();
  });
  test('sends a GraphQL request when clicking the "Run" button', async () => {
    render(<GraphiQLPage />);

    fireEvent.click(screen.getByTitle('run query'));

    await waitFor(() => {
      expect(axiosPostSpy).toHaveBeenCalledTimes(1);
    });
    axiosPostSpy.mockRestore();
  });
});
