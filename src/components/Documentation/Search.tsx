import { useState, useEffect, ChangeEvent, FC } from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import { Schema } from '../../types';

import '@styles/Search.css';

interface SearchProps {
  schema: Schema;
  setSearchItem: (item: string) => void;
}

interface SearchResult {
  name: string;
}

export const Search: FC<SearchProps> = ({ schema, setSearchItem }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const search = () => {
    if (searchTerm !== '') {
      const results = schema.types.flatMap((type) => [
        { name: type.name },
        ...(type.fields
          ? type.fields.map((field) => ({
              name: `${type.name}.${field.name}`,
            }))
          : []),
      ]);

      setSearchResults(
        results.filter(
          (item) =>
            item.name &&
            item.name.toLowerCase().includes(searchTerm.toLowerCase()),
        ),
      );
    } else {
      setSearchResults([]);
    }
  };

  useEffect(search, [searchTerm, schema]);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    setSearchTerm('');
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className={`docs-search ${isSearchOpen ? 'active' : ''}`}>
      <IoSearchOutline className='docs-search-icon' onClick={toggleSearch} />
      {isSearchOpen && (
        <input
          type='text'
          placeholder='Search...'
          value={searchTerm}
          onChange={handleInputChange}
        />
      )}
      {isSearchOpen && searchTerm !== '' && (
        <div className='autocomplete-dropdown'>
          {searchResults.length > 0 ? (
            searchResults.map((item) => (
              <div
                key={item.name}
                className='autocomplete-item'
                onClick={() => {
                  setSearchItem(item.name);
                  setSearchTerm('');
                }}
              >
                <div>{item.name}</div>
              </div>
            ))
          ) : (
            <div>No results</div>
          )}
        </div>
      )}
    </div>
  );
};
