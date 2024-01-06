import { FC } from 'react';
import { NO_FIELDS_MESSAGE } from '@constants/constants';
import { GraphQLType, GraphQLField, GraphQLKind } from '@appTypes/types';

import '@styles/Documentation.css';

interface TypeComponentProps {
  type: GraphQLType;
  onFieldClick: (field: GraphQLField) => void;
  onKindClick: (kind: GraphQLKind) => void;
}

export const TypeComponent: FC<TypeComponentProps> = ({
  type,
  onFieldClick,
  onKindClick,
}) => {
  const { name, fields } = type;
  return (
    <section className='docs-container' data-testid='type-item'>
      <h2 className='docs-title'>{name}:</h2>
      {fields?.length ? (
        <ul className='fields-list'>
          {fields.map((field) => (
            <li
              key={field.name}
              className='fields-list-item'
              onClick={() => onFieldClick(field)}
            >
              <div className='name-kind-container'>
                <span className='name'>{field.name}:</span>
                <span
                  className='kind-name'
                  onClick={() => onKindClick(field.type)}
                >
                  {field.type.name ? field.type.name : 'No kind name'}
                </span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className='docs-description'>{NO_FIELDS_MESSAGE}</p>
      )}
    </section>
  );
};
