import { FC } from 'react';
import { GraphQLType } from '../../../types';

import '@styles/KindComponent.css';

interface KindComponentProps {
  selectedKind: GraphQLType;
}

export const KindComponent: FC<KindComponentProps> = ({ selectedKind }) => {
  let firstFieldDescription: string | undefined;

  if (selectedKind.fields && selectedKind.fields.length > 0) {
    firstFieldDescription = selectedKind.fields[0].type.description;
  }

  return (
    <div className='kind-container' data-testid='kind-item'>
      {firstFieldDescription ? (
        <div>{firstFieldDescription}</div>
      ) : (
        <div>
          Sorry, there is no description here. The API developers have not
          provided one.
        </div>
      )}
    </div>
  );
};
