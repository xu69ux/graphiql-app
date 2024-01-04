import { FC } from 'react';
import { KindType } from '../../../types';

import '@styles/KindComponent.css';

interface KindComponentProps {
  selectedKind: KindType;
}

export const KindComponent: FC<KindComponentProps> = ({ selectedKind }) => {
  return (
    <div className='kind-container' data-testid='kind-item'>
      {selectedKind.description ? (
        <div>{selectedKind.description}</div>
      ) : (
        <div>
          Sorry, there is no description here. The API developers have not
          provided one.
        </div>
      )}
    </div>
  );
};
