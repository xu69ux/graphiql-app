import { FC } from 'react';
import { GraphQLSchema, GraphQLType, GraphQLField } from '../../../types';
import { FieldComponent } from '../../../components';

import '@styles/TypeComponent.css';

interface TypeComponentProps {
  schema: GraphQLSchema | null;
  selectedType: GraphQLType;
  selectedField: GraphQLField | null;
  setSelectedField: (field: GraphQLField | null) => void;
  setSelectedKind: (kind: GraphQLType | null) => void;
  setSelectedType: (type: GraphQLType | null) => void;
  handleKindClick: (typeName: string) => void;
}

export const TypeComponent: FC<TypeComponentProps> = ({
  selectedType,
  selectedField,
  setSelectedField,
  handleKindClick,
}) => {
  const type = selectedType;

  const handleFieldClick = (field: GraphQLField) => {
    setSelectedField(field);
  };

  return (
    <div className='type-container' data-testid='selected-type'>
      {selectedField ? (
        <>
          <FieldComponent
            field={selectedField}
            handleKindClick={handleKindClick}
          />
        </>
      ) : (
        <>
          <p className='type-subtitle'>{type.name}:</p>
          {Array.isArray(type.fields) && type.fields.length > 0 ? (
            type.fields.map((field) => (
              <p
                className='field'
                key={field.name}
                onClick={() => handleFieldClick(field)}
              >
                {field.name}
              </p>
            ))
          ) : (
            <p>This type has no fields.</p>
          )}
        </>
      )}
    </div>
  );
};
