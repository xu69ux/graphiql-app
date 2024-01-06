import { useState, useEffect, FC } from 'react';
import {
  BackButton,
  FieldComponent,
  KindComponent,
  Search,
  TypeComponent,
} from '@components/index';
import {
  GraphQLSchema,
  GraphQLType,
  GraphQLField,
  GraphQLKind,
} from '@appTypes/types';
import { findTypeByName, findFieldByName, findKindByName } from '@utils/findBy';
import { NO_SCHEMA_MESSAGE } from '@constants/constants';

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
  const [selectedKind, setSelectedKind] = useState<GraphQLKind | null>(null);
  const [searchItem, setSearchItem] = useState('');

  useEffect(() => {
    if (schema && searchItem) {
      const [typeName, fieldName, kindName] = searchItem.split('.');
      if (typeName) {
        const type = findTypeByName(schema, typeName);
        if (type) {
          setSelectedType(type);
          if (fieldName) {
            const field = findFieldByName(schema, fieldName);
            if (field) {
              setSelectedField(field);
            }
          }
          if (kindName) {
            const kind = findKindByName(schema, kindName);
            if (kind) {
              setSelectedKind(kind);
            }
          }
        }
      }
    }
  }, [schema, searchItem]);

  return (
    <div
      className={`documentation ${schema && isDocumentationOpen ? 'open' : ''}`}
      data-testid='documentation'
    >
      <h1 className='docs-title'>Documentation</h1>
      <Search schema={schema} setSearchItem={setSearchItem} />
      {selectedType && (
        <BackButton
          className={selectedType ? '' : 'hidden'}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          selectedField={selectedField}
          setSelectedField={setSelectedField}
          selectedKind={selectedKind}
          setSelectedKind={setSelectedKind}
        />
      )}
      {selectedKind ? (
        <KindComponent kind={selectedKind as GraphQLKind} />
      ) : selectedField ? (
        <FieldComponent field={selectedField as GraphQLField} />
      ) : selectedType ? (
        <TypeComponent
          type={selectedType as GraphQLType}
          onFieldClick={setSelectedField}
          onKindClick={setSelectedKind}
        />
      ) : schema && schema.types && schema.types.length > 0 ? (
        <section className='docs-container' data-testid='type-item'>
          <h2 className='docs-title'>Types:</h2>
          <ul className='types-list'>
            {schema.types.map((type) => (
              <li key={type.name} className='types-list-item'>
                <div className='name-kind-container'>
                  <span
                    className='name'
                    onClick={() => setSelectedType(type as GraphQLType)}
                  >
                    {type.name}:
                  </span>
                  <span className='kind'>{type.kind}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>
      ) : (
        <p>{NO_SCHEMA_MESSAGE}</p>
      )}
    </div>
  );
};
