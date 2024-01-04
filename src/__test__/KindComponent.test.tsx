import { render, screen } from '@testing-library/react';
import { KindComponent } from '../components';
import { GraphQLKind } from '../types';

test('renders the KindComponent with a description', () => {
  const mockKind: GraphQLKind = {
    kind: 'Kind1 kind',
    name: 'Kind1 name',
    description: 'Kind1 description',
  };

  render(<KindComponent kind={mockKind} />);

  expect(screen.getByText('Kind1 description')).toBeInTheDocument();
});

test('renders the KindComponent without a description', () => {
  const mockKind: GraphQLKind = {
    kind: 'Kind1 kind',
    name: 'Kind1 name',
    description: '',
  };

  render(<KindComponent kind={mockKind} />);

  expect(
    screen.getByText(
      'Sorry, there is no description here. The API developers have not provided one.',
    ),
  ).toBeInTheDocument();
});
