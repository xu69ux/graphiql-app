import { render, fireEvent, screen, act } from '@testing-library/react';
import { Search } from '../components';
import { GraphQLSchema } from '../types';
import { LanguageProvider } from '../contexts/LanguageProvider';

const mockSchema: GraphQLSchema = {
  types: [
    {
      name: 'Type1',
      description: 'Type1 Description',
      fields: [
        {
          name: 'Field1',
          description: 'Field1 Description',
          type: {
            kind: 'Kind',
            description: 'Type1 Description',
          },
        },
      ],
      kind: 'Kind',
    },
    {
      name: 'Type2',
      description: 'Type2 Description',
      fields: [
        {
          name: 'Field2',
          description: 'Field2 Description',
          type: {
            kind: 'Kind',
            description: 'Type2 Description',
          },
        },
      ],
      kind: 'Kind',
    },
  ],
};

test('renders search icon', () => {
  render(
    <LanguageProvider>
      <Search schema={{ types: [] }} setSearchItem={() => {}} />
    </LanguageProvider>,
  );
  const searchIcon = screen.getByTestId('search-icon');
  expect(searchIcon).toBeInTheDocument();
});

test('opens search on icon click', () => {
  render(
    <LanguageProvider>
      <Search schema={{ types: [] }} setSearchItem={() => {}} />
    </LanguageProvider>,
  );
  const searchIcon = screen.getByTestId('search-icon');
  act(() => {
    fireEvent.click(searchIcon);
  });
  const searchInput = screen.getByPlaceholderText('search...');
  expect(searchInput).toBeInTheDocument();
});

test('displays search results', () => {
  render(
    <LanguageProvider>
      <Search schema={mockSchema} setSearchItem={() => {}} />
    </LanguageProvider>,
  );
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
  render(
    <LanguageProvider>
      <Search schema={mockSchema} setSearchItem={() => {}} />
    </LanguageProvider>,
  );
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
