import { FC } from 'react';
import { NO_DESCRIPTION_MESSAGE } from '../../../constants';
import { GraphQLField } from '../../../types';

import '@styles/Documentation.css';

interface FieldComponentProps {
  field: GraphQLField;
}

export const FieldComponent: FC<FieldComponentProps> = ({ field }) => {
  console.log('FieldComponent');
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
