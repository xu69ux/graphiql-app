import { FC } from 'react';
import { NO_DESCRIPTION_MESSAGE } from '@constants/constants';
import { GraphQLField } from '@appTypes/types';

import '@styles/Documentation.css';

interface FieldComponentProps {
  field: GraphQLField;
}

export const FieldComponent: FC<FieldComponentProps> = ({ field }) => {
  const { name, description } = field;

  return (
    <section className='docs-container' data-testid='field-item'>
      <h2 className='docs-title'>{name} field:</h2>
      <p className='docs-description'>
        {description || NO_DESCRIPTION_MESSAGE}
      </p>
    </section>
  );
};
