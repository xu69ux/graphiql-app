import { FC } from 'react';
import { FieldType, GraphQLSchema, KindType, Type } from '../../../types';
import { FieldComponent } from '../../../components';

import '@styles/TypeComponent.css';

interface TypeComponentProps {
  schema: GraphQLSchema | null;
  selectedType: Type;
  selectedField: FieldType | null;
  setSelectedField: (field: FieldType | null) => void;
  setSelectedKind: (kind: KindType | null) => void;
  setSelectedType: (type: Type | null) => void;
}

export const TypeComponent: FC<TypeComponentProps> = ({
  selectedType,
  selectedField,
  setSelectedField,
  setSelectedKind,
  setSelectedType,
  schema,
}) => {
  const type = selectedType;

  const handleFieldClick = (field: FieldType) => {
    setSelectedField(field);
  };

  return (
    <div className='type-container' data-testid='selected-type'>
      {selectedField ? (
        <>
          <FieldComponent
            field={selectedField}
            setSelectedKind={setSelectedKind}
            schema={schema}
            setSelectedType={setSelectedType}
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
