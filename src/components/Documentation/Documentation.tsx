import { useState, useEffect } from 'react';
import { Search } from './Search';
import { IoChevronForward } from 'react-icons/io5';
import { Schema, FieldType, Type, TypeKind } from '../../types';

import '@styles/Documentation.css';

interface DocumentationProps {
  isDocumentationOpen: boolean;
  schema: Schema | null;
}

const findTypeByName = (types: Type[], name: string): Type | undefined =>
  types.find((t) => t.name === name);
const findFieldByName = (
  fields: FieldType[],
  name: string,
): FieldType | undefined => fields.find((f) => f.name === name);

export const Documentation: React.FC<DocumentationProps> = ({
  isDocumentationOpen,
  schema,
}) => {
  const [selectedType, setSelectedType] = useState<Type | null>(null);
  const [selectedField, setSelectedField] = useState<FieldType | null>(null);
  const [selectedKind, setSelectedKind] = useState<TypeKind | null>(null);
  const [searchItem, setSearchItem] = useState('');

  console.log(schema);

  useEffect(() => {
    if (searchItem) {
      const [typeName, fieldName] = searchItem.split('.');
      const typeObj = schema && findTypeByName(schema.types, typeName);
      if (typeObj) {
        setSelectedType(typeObj);
        const fieldObj = findFieldByName(typeObj.fields, fieldName);
        if (fieldObj) {
          setSelectedField(fieldObj);
        }
      }
    }
  }, [schema, searchItem]);

  const handleBackClick = () => {
    setSearchItem('');
    setSelectedField(null);
    setSelectedKind(null);
    if (!selectedField) {
      setSelectedType(null);
    }
  };

  return (
    <div className={`documentation ${isDocumentationOpen ? 'open' : ''}`}>
      <h1 className='docs-title'>Documentation</h1>
      {schema ? (
        <>
          <Search schema={schema} setSearchItem={setSearchItem} />
          {selectedType || selectedField ? (
            <button className='docs-back' onClick={handleBackClick}>
              <IoChevronForward className='back-icon' />
              <IoChevronForward className='back-icon' />
              <IoChevronForward className='back-icon' />
              <span>
                {selectedField
                  ? 'Back to Fields'
                  : selectedType
                    ? 'Back to Types'
                    : 'Back'}
              </span>
            </button>
          ) : (
            <button className='docs-back hidden' />
          )}
          {selectedKind ? (
            <div className='kind-container'>
              <h2 className='docs-subtitle'>{selectedKind.kind}:</h2>
              <p>{selectedKind.description}</p>
            </div>
          ) : selectedField ? (
            <div className='docs-container'>
              <h2 className='docs-subtitle description'>
                {selectedField.name}:
              </h2>
              <p>
                {selectedField.description ||
                  'There is no description for this.'}
              </p>
            </div>
          ) : selectedType ? (
            <div className='docs-container'>
              <h2 className='docs-subtitle'>{selectedType.name}:</h2>
              {selectedType.fields && selectedType.fields.length > 0 ? (
                selectedType.fields.map((field) => (
                  <div className='field-container'>
                    <div
                      key={field.name}
                      className='docs-item'
                      onClick={() => setSelectedField(field)}
                    >
                      {field.name}:
                    </div>
                    <div
                      key={field.name}
                      className='field-type'
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedKind(field.type);
                      }}
                    >
                      {field.type.kind}
                    </div>
                  </div>
                ))
              ) : (
                <p>
                  This is some scalar;
                  <br />
                  there are no fields.
                </p>
              )}
            </div>
          ) : (
            <div className='docs-container'>
              <h2 className='docs-subtitle'>Types:</h2>
              {schema?.types
                ? schema.types.map((type) => (
                    <div
                      key={type.name}
                      className='docs-item'
                      onClick={() => setSelectedType(type)}
                    >
                      {type.name}
                    </div>
                  ))
                : null}
            </div>
          )}
        </>
      ) : (
        <p className='no-docs'>Enter the endpoint to retrieve documentation</p>
      )}
    </div>
  );
};
