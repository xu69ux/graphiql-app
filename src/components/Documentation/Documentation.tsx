import { useState, useEffect, FC } from 'react';
import {
  BackButton,
  KindComponent,
  Search,
  TypeComponent,
} from '../../components';
import { GraphQLSchema, Type, FieldType, KindType } from '../../types';
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
  const [selectedType, setSelectedType] = useState<Type | null>(null);
  const [selectedField, setSelectedField] = useState<FieldType | null>(null);
  const [selectedKind, setSelectedKind] = useState<KindType | null>(null);
  const [searchItem, setSearchItem] = useState('');

  const handleTypeClick = (type: Type) => {
    setSelectedType(type);
  };

  const handleKindClick = (kindName: string) => {
    const kind = schema?.types.find((type) => type.kind === kindName);
    if (kind) {
      setSelectedKind(kind);
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
      {selectedType ? (
        <>
          <BackButton
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            selectedField={selectedField}
            setSelectedField={setSelectedField}
          />
          <TypeComponent
            selectedType={selectedType}
            selectedField={selectedField}
            setSelectedField={setSelectedField}
            setSelectedKind={setSelectedKind}
            setSelectedType={setSelectedType}
            schema={schema}
          />
        </>
      ) : selectedKind ? (
        <>
          <BackButton
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            selectedField={selectedField}
            setSelectedField={setSelectedField}
            selectedKind={selectedKind}
            setSelectedKind={setSelectedKind}
          />
          <KindComponent selectedKind={selectedKind} />
        </>
      ) : (
        <>
          <BackButton className='hidden' />
          <div className='subtitle'>Types:</div>
          <div className='types-container'>
            {schema?.types.map((type) => (
              <div key={type.name} className='type-kind-container'>
                <p
                  className='type'
                  data-testid='type-item'
                  onClick={() => handleTypeClick(type)}
                >
                  {type.name}:
                </p>
                <p className='kind' onClick={() => handleKindClick(type.kind)}>
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
