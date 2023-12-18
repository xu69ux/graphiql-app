import { useState } from 'react';
import { IoSearchOutline } from 'react-icons/io5';

export const Search = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <div
      className={`docs-search ${isSearchOpen ? 'active' : ''}`}
      onClick={() => {
        toggleSearch();
      }}
    >
      <input type='text' placeholder='Search...' />
      <IoSearchOutline className='docs-search-icon' />
    </div>
  );
};
