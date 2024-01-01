import { render, screen } from '@testing-library/react';
import { KindComponent } from '../components';
import { KindType } from '../types';

test('renders the KindComponent with a description', () => {
  const mockKind: KindType = {
    kind: 'Test kind',
    description: 'Test description',
  };

  render(<KindComponent selectedKind={mockKind} />);

  expect(screen.getByText('Test description')).toBeInTheDocument();
});

test('renders the KindComponent without a description', () => {
  const mockKind: KindType = {
    kind: 'Test kind',
    description: '',
  };

  render(<KindComponent selectedKind={mockKind} />);

  expect(
    screen.getByText(
      'Sorry, there is no description here. The API developers have not provided one.',
    ),
  ).toBeInTheDocument();
});
