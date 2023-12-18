import { useState, useEffect } from 'react';
import { Search } from './Search';
import { IoChevronForward } from 'react-icons/io5';

import '@styles/Documentation.css';

interface FieldType {
  name: string;
  description: string;
}

interface Type {
  name: string;
  description: string;
  fields: FieldType[];
}

interface Schema {
  types: Type[];
}

interface DocumentationProps {
  isDocumentationOpen: boolean;
  schema: Schema | null;
}

export const Documentation: React.FC<DocumentationProps> = ({
  isDocumentationOpen,
  schema,
}) => {
  const [selectedType, setSelectedType] = useState<Type | null>(null);
  const [selectedField, setSelectedField] = useState<FieldType | null>(null);
  const [searchItem, setSearchItem] = useState('');

  useEffect(() => {
    if (searchItem) {
      const [type, field] = searchItem.split('.');
      const typeObj = schema?.types.find((t) => t.name === type);
      if (typeObj) {
        setSelectedType(typeObj);
        const fieldObj = typeObj.fields.find((f) => f.name === field);
        if (fieldObj) {
          setSelectedField(fieldObj);
        }
      }
    }
  }, [schema, searchItem]);

  const handleBackClick = () => {
    setSearchItem('');
    setSelectedField(null);
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
          {selectedField ? (
            <div className='docs-container'>
              <h2 className='docs-subtitle'>{selectedField.name}:</h2>
              <p>{selectedField.description}</p>
            </div>
          ) : selectedType ? (
            <div className='docs-container'>
              <h2 className='docs-subtitle'>{selectedType.name}:</h2>
              {selectedType.fields && selectedType.fields.length > 0 ? (
                selectedType.fields.map((field) => (
                  <div
                    key={field.name}
                    className='docs-item'
                    onClick={() => setSelectedField(field)}
                  >
                    {field.name}
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
