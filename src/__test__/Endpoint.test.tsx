import { render, screen, fireEvent } from './test-utils';
import { Endpoint } from '@components/index';

test('renders Endpoint with initial state', () => {
  render(
    <Endpoint endpointValue='' setEndpoint={() => {}} fetchShema={() => {}} />,
  );
  expect(screen.getByTestId('endpoint')).toBeInTheDocument();
  expect(screen.getByTestId('endpoint-input')).toHaveValue('');
});

test('calls setEndpoint with input value on endpoint input change', () => {
  const setEndpoint = jest.fn();
  render(
    <Endpoint
      endpointValue=''
      setEndpoint={setEndpoint}
      fetchShema={() => {}}
    />,
  );
  const endpointInput = screen.getByTestId('endpoint-input');
  fireEvent.change(endpointInput, { target: { value: 'new-endpoint' } });
  expect(setEndpoint).toHaveBeenCalledWith('new-endpoint');
});

test('calls fetchShema on endpoint input blur', () => {
  const fetchShema = jest.fn();
  render(
    <Endpoint
      endpointValue=''
      setEndpoint={() => {}}
      fetchShema={fetchShema}
    />,
  );
  const endpointInput = screen.getByTestId('endpoint-input');
  fireEvent.blur(endpointInput);
  expect(fetchShema).toHaveBeenCalled();
});

test('calls setEndpoint with random endpoint on random endpoint button click', () => {
  const setEndpoint = jest.fn();
  render(
    <Endpoint
      endpointValue=''
      setEndpoint={setEndpoint}
      fetchShema={() => {}}
    />,
  );
  fireEvent.click(screen.getByTitle('use random endpoint'));
  expect(setEndpoint).toHaveBeenCalled();
});
