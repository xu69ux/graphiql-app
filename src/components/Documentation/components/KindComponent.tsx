import { FC } from 'react';
import { NO_DESCRIPTION_MESSAGE } from '../../../constants';
import { GraphQLKind } from '../../../types';

import '@styles/Documentation.css';

interface KindComponentProps {
  kind: GraphQLKind;
}

export const KindComponent: FC<KindComponentProps> = ({ kind }) => {
  const { name, description } = kind;

  return (
    <section className='docs-container' data-testid='kind-item'>
      <h2 className='docs-title'>
        {name}: {kind.kind}
      </h2>
      <p className='docs-description'>
        {description || NO_DESCRIPTION_MESSAGE}
      </p>
    </section>
  );
};
