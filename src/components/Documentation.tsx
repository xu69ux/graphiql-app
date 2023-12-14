import { useState } from 'react';
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
        {selectedWord ? (
          <div className='documentation-item-description'>
            {selectedWord.description}
          </div>
        ) : (
          GRAPHQLWORDS.map((word) => (
            <>
              <h2>Documentation</h2>
              <div className='documentation-item' key={word.name}>
                <div
                  className='documentation-item-name'
                  onClick={() => setSelectedWord(word)}
                >
                  {word.name}
                </div>
              </div>
            </>
          ))
        )}
      </div>
    </div>
  );
};
