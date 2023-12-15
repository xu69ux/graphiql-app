import { useState, useRef } from 'react';
import { IoChevronForward, IoSearchOutline } from 'react-icons/io5';
import { GRAPHQLWORDS } from '../utils/constants';

import '@styles/Documentation.css';

export const Documentation = ({ isDocumentationOpen }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedWord, setSelectedWord] = useState<{
    name: string;
    description: string;
  } | null>(null);

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const toggleSearch = () => setIsSearchOpen((prev) => !prev);

  return (
    <div className={`documentation ${isDocumentationOpen ? 'open' : ''}`}>
      <div className='documentation-container'>
        <h2>Documentation</h2>
        <div
          className={`documentation-search ${isSearchOpen ? 'active' : ''}`}
          onClick={() => {
            toggleSearch();
            focusInput();
          }}
        >
          <input ref={inputRef} type='text' placeholder='Search...' />
          <IoSearchOutline className='documentation-search-icon' />
        </div>
        {selectedWord && (
          <button
            className='documentation-back'
            onClick={() => setSelectedWord(null)}
          >
            <IoChevronForward className='documentation-back icon' />
            <IoChevronForward className='documentation-back icon' />
            <IoChevronForward className='documentation-back icon' />
          </button>
        )}
        {selectedWord ? (
          <div className='documentation-item-description'>
            {selectedWord.description}
          </div>
        ) : (
          <div className='documentation-item-container'>
            {GRAPHQLWORDS.map((word) => (
              <div className='documentation-item' key={word.name}>
                <div
                  className='documentation-item-name'
                  onClick={() => setSelectedWord(word)}
                >
                  {word.name}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
