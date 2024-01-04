import { FC } from 'react';
import { GraphQLSchema, Type, FieldType, KindType } from '../../../types';

import '@styles/FieldComponent.css';

interface FieldComponentProps {
  schema: GraphQLSchema | null;
  field: FieldType;
  setSelectedKind: (kind: KindType | null) => void;
  setSelectedType: (type: Type | null) => void;
}

export const FieldComponent: FC<FieldComponentProps> = ({
  field,
  setSelectedKind,
  schema,
  setSelectedType,
}) => {
  const handleKindClick = (kindName: string) => {
    const kind = schema?.types?.find((type) => type.kind === kindName);
    if (kind) {
      setSelectedKind(kind);
      setSelectedType(null);
    }
  };

  return (
    <div key={field.name} className='field-item' data-testid='field-item'>
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
