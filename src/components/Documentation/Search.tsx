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
    if (schema) {
      const results = schema.types.flatMap((type) => [
        { name: type.name, description: type.description },
        ...(type.fields
          ? type.fields.map((field) => ({
              name: `${type.name}.${field.name}`,
              description: field.description,
            }))
          : []),
      ]);

      setSearchResults(
        results.filter(
          (item) =>
            item.name.includes(searchTerm) ||
            item.description.includes(searchTerm),
        ),
      );
    }
  }, [searchTerm, schema]);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <div
      className={`docs-search ${isSearchOpen ? 'active' : ''}`}
      onClick={toggleSearch}
    >
      <IoSearchOutline className='docs-search-icon' />
      <input
        type='text'
        placeholder='Search...'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {isSearchOpen && (
        <div className='autocomplete-dropdown'>
          {searchResults.map((item, index) => (
            <div key={index} className='autocomplete-item'>
              <div>{item.name}</div>
              <div>{item.description}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
