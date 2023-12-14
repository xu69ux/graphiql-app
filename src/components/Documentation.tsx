import { useState } from 'react';
import { IoChevronForward } from 'react-icons/io5';
import { GRAPHQLWORDS } from '../constants';

import '@styles/Documentation.css';

export const Documentation = ({ isDocumentationOpen }) => {
  const [selectedWord, setSelectedWord] = useState<{
    name: string;
    description: string;
  } | null>(null);

  return (
    <div className={`documentation ${isDocumentationOpen ? 'open' : ''}`}>
      <div className='documentation-container'>
        <h2>Documentation</h2>
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
