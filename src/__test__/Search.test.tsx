import { render, fireEvent, screen, act } from './test-utils';
import { Search } from '../components';
import { GraphQLSchema } from '../types';

const mockSchema: GraphQLSchema = {
  types: [
    {
      name: 'Type1',
      kind: 'Type1 Kind',
      fields: [
        {
          name: 'Field1',
          description: 'Field1 Description',
          type: {
            kind: 'Kind1',
            name: 'Kind1 Name',
            description: 'Kind1 Description',
          },
        },
      ],
    },
    {
      name: 'Type2',
      kind: 'Type2 Kind',
      fields: [
        {
          name: 'Field2',
          description: 'Field2 Description',
          type: {
            kind: 'Kind2',
            name: 'Kind2 Name',
            description: 'Kind2 Description',
          },
        },
      ],
    },
  ],
};

test('renders search icon', () => {
  render(<Search schema={{ types: [] }} setSearchItem={() => {}} />);
  const searchIcon = screen.getByTestId('search-icon');
  expect(searchIcon).toBeInTheDocument();
});

test('opens search on icon click', () => {
  render(<Search schema={{ types: [] }} setSearchItem={() => {}} />);
  const searchIcon = screen.getByTestId('search-icon');
  act(() => {
    fireEvent.click(searchIcon);
  });
  const searchInput = screen.getByPlaceholderText('search...');
  expect(searchInput).toBeInTheDocument();
});

test('displays search results', () => {
  render(<Search schema={mockSchema} setSearchItem={() => {}} />);
  const searchIcon = screen.getByTestId('search-icon');
  act(() => {
    fireEvent.click(searchIcon);
  });
  const searchInput = screen.getByPlaceholderText('search...');
  act(() => {
    fireEvent.change(searchInput, { target: { value: 'Type1' } });
  });
  const searchResults = screen.getByText('Type1.Field1');
  expect(searchResults).toBeInTheDocument();
});

test('displays no results message', () => {
  render(<Search schema={mockSchema} setSearchItem={() => {}} />);
  const searchIcon = screen.getByTestId('search-icon');
  act(() => {
    fireEvent.click(searchIcon);
  });
  const searchInput = screen.getByPlaceholderText('search...');
  act(() => {
    fireEvent.change(searchInput, { target: { value: 'Type3' } });
  });
  const searchResults = screen.getByText('no results');
  expect(searchResults).toBeInTheDocument();
});
