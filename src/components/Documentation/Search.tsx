import { useState, useEffect } from 'react';
import { IoSearchOutline } from 'react-icons/io5';

import '@styles/Search.css';

export const Search = ({ schema }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<
    { name: string; description: string }[]
  >([]);

  useEffect(() => {
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
  }, [searchTerm, schema]);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    setSearchTerm('');
  };

  return (
    <div className={`docs-search ${isSearchOpen ? 'active' : ''}`}>
      <IoSearchOutline
        className='docs-search-icon'
        onClick={() => {
          toggleSearch();
        }}
      />
      {isSearchOpen && (
        <input
          type='text'
          placeholder='Search...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      )}
      {isSearchOpen && searchTerm !== '' && (
        <div className='autocomplete-dropdown'>
          {searchResults.length > 0 ? (
            searchResults.map((item, index) => (
              <div
                key={index}
                className='autocomplete-item'
                onClick={() => {
                  localStorage.setItem('selectedItem', JSON.stringify(item));
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
