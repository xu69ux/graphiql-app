import { useState, useEffect, ChangeEvent, FC } from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import { GraphQLSchema } from '@appTypes/types';
import { translations } from '@contexts/translations';
import useLanguage from '@hooks/useLanguage';

import '@styles/Search.css';

interface SearchProps {
  schema: GraphQLSchema | null;
  setSearchItem: (item: string) => void;
}

interface SearchResult {
  name: string;
}

export const Search: FC<SearchProps> = ({ schema, setSearchItem }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const { language } = useLanguage();

  const search = () => {
    if (searchTerm !== '') {
      const kindSet = new Set<string>();
      const results = schema?.types.flatMap((type) => {
        if (type.kind) {
          kindSet.add(type.kind);
        }
        return [
          { name: type.name },
          ...(type.fields
            ? type.fields.map((field) => ({
                name: `${type.name}.${field.name}`,
              }))
            : []),
          ...(type.kind ? [{ name: `${type.name}.${type.kind}` }] : []),
        ];
      });

      setSearchResults(
        [...(results || [])].filter((item) =>
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
      <IoSearchOutline
        className='docs-search-icon'
        onClick={toggleSearch}
        data-testid='search-icon'
      />
      {isSearchOpen && (
        <input
          type='text'
          placeholder={translations[language]?.searchPlaceholder}
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
            <div>{translations[language].noResults}</div>
          )}
        </div>
      )}
    </div>
  );
};
