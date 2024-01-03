import { FC } from 'react';
import { GraphQLField } from '../../../types';

import '@styles/FieldComponent.css';

interface FieldComponentProps {
  field: GraphQLField;
  handleKindClick: (typeName: string) => void;
}

export const FieldComponent: FC<FieldComponentProps> = ({
  field,
  handleKindClick,
}) => {
  return (
    <div key={field.name} className='field-item' data-testid='field-item'>
      <div className='field-kind-container'>
        <p className='field-name'>{field.name}:</p>
        <p className='field-kind' onClick={() => handleKindClick(field.name)}>
          {field.type.kind}
        </p>
      </div>
      {field.description ? (
        <div className='field-description'>{field.description}</div>
      ) : (
        <div className='field-description'>
          Sorry, there is no description here. The API developers have not
          provided one.
        </div>
      )}
    </div>
  );
};
