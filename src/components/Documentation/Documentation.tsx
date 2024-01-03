import { useState, useEffect, FC } from 'react';
import {
  BackButton,
  KindComponent,
  Search,
  TypeComponent,
} from '../../components';
import { GraphQLSchema, GraphQLType, GraphQLField } from '../../types';
import {
  findTypeByName,
  findFieldByName,
  findKindByName,
} from '../../utils/findBy';

import '@styles/Documentation.css';

interface DocumentationProps {
  schema: GraphQLSchema | null;
  isDocumentationOpen: boolean;
}

export const Documentation: FC<DocumentationProps> = ({
  isDocumentationOpen,
  schema,
}) => {
  const [selectedType, setSelectedType] = useState<GraphQLType | null>(null);
  const [selectedField, setSelectedField] = useState<GraphQLField | null>(null);
  const [selectedKind, setSelectedKind] = useState<GraphQLType | null>(null);
  const [searchItem, setSearchItem] = useState('');
  console.log(schema);

  const handleTypeClick = (type: GraphQLType) => {
    setSelectedType(type);
  };

  const handleKindClick = (typeName: string) => {
    console.log(typeName);
    const lowerCaseTypeName = typeName.toLowerCase();
    const kind = schema?.types?.find(
      (type) => type.name.toLowerCase() === lowerCaseTypeName,
    );
    if (kind) {
      setSelectedKind(kind);
      setSelectedType(null);
    }
  };

  useEffect(() => {
    if (searchItem) {
      const [typeName, fieldName, kindName] = searchItem.split('.');
      const typeObj = schema && findTypeByName(schema.types, typeName);
      if (typeObj) {
        setSelectedType(typeObj);
        const fieldObj = findFieldByName(typeObj.fields, fieldName);
        if (fieldObj) {
          setSelectedField(fieldObj);
        }
        const kindObj = findKindByName(schema.types, kindName);

        if (kindObj) {
          setSelectedKind(kindObj);
        }
      }
    }
  }, [schema, searchItem]);

  return (
    <div
      className={`documentation ${isDocumentationOpen ? 'open' : ''}`}
      data-testid='documentation'
    >
      <h1 className='docs-title'>Documentation</h1>
      <Search schema={schema} setSearchItem={setSearchItem} />
      <BackButton
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        selectedField={selectedField}
        setSelectedField={setSelectedField}
        selectedKind={selectedKind}
        setSelectedKind={setSelectedKind}
        className={selectedType || selectedKind ? '' : 'hidden'}
      />
      {selectedType ? (
        <TypeComponent
          selectedType={selectedType}
          selectedField={selectedField}
          setSelectedField={setSelectedField}
          setSelectedKind={setSelectedKind}
          setSelectedType={setSelectedType}
          handleKindClick={handleKindClick}
          schema={schema}
        />
      ) : selectedKind ? (
        <KindComponent selectedKind={selectedKind} />
      ) : (
        <>
          <BackButton className='hidden' />
          <div className='subtitle'>Types:</div>
          <div className='types-container'>
            {schema?.types.map((type, index) => (
              <div key={index} className='type-kind-container'>
                <p
                  className='type'
                  data-testid='type-item'
                  onClick={() => handleTypeClick(type)}
                >
                  {type.name}:
                </p>
                <p className='kind' onClick={() => handleKindClick(type.name)}>
                  {type.kind}
                </p>
              </div>
            ))}
            {selectedKind && <KindComponent selectedKind={selectedKind} />}
          </div>
        </>
      )}
    </div>
  );
};
