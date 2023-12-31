import React from 'react';
import { FieldType, GraphQLSchema, Type } from '../../../types';

import '@styles/FieldComponent.css';

interface FieldComponentProps {
  field: FieldType;
  setSelectedKind: (kind: string | null) => void;
  schema: GraphQLSchema;
  setSelectedType: (type: Type | null) => void;
}

export const FieldComponent: React.FC<FieldComponentProps> = ({
  field,
  setSelectedKind,
  schema,
  setSelectedType,
}) => {
  const handleKindClick = (kindName: string) => {
    const kind = schema?.types?.find((type) => type.kind === kindName);
    if (kind) {
      setSelectedKind(kind.kind);
      setSelectedType(null);
    }
  };

  return (
    <div
      key={field.name}
      className='field-item'
      data-testid={`field-item-${field.name}`}
    >
      <div className='field-kind-container'>
        <p className='field-name'>{field.name}:</p>
        <p
          className='field-kind'
          onClick={() => handleKindClick(field.type.kind)}
        >
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
