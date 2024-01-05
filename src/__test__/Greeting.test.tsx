import { render, screen } from './test-utils';
import { Greeting } from '../components';

test('renders greeting with name when name is provided', () => {
  render(<Greeting name='John' isLoading={false} />);
  const greetingElement = screen.getByText(/John/);
  expect(greetingElement).toBeInTheDocument();
});

test('renders greeting with noName when name is not provided', () => {
  render(<Greeting isLoading={false} name={undefined} />);
  const greetingElement = screen.getByText('hello, username!');
  expect(greetingElement).toBeInTheDocument();
});
