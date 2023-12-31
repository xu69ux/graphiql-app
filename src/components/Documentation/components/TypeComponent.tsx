import { FieldType, GraphQLSchema, Type } from '../../../types';
import { FieldComponent } from '../../../components';

import '@styles/TypeComponent.css';

interface TypeComponentProps {
  selectedType: Type;
  selectedField: FieldType | null;
  setSelectedField: (field: FieldType | null) => void;
  setSelectedKind: (kind: string | null) => void;
  schema: GraphQLSchema;
  setSelectedType: (type: Type | null) => void;
}

export const TypeComponent: React.FC<TypeComponentProps> = ({
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
    <div className='type-container'>
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
          {Array.isArray(type.fields) &&
            type.fields.map((field) => (
              <p
                className='field'
                key={field.name}
                onClick={() => handleFieldClick(field)}
              >
                {field.name}
              </p>
            ))}
        </>
      )}
    </div>
  );
};
