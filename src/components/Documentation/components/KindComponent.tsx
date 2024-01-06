import { FC } from 'react';
import { NO_DESCRIPTION_MESSAGE } from '@constants/constants';
import { GraphQLKind } from '@appTypes/types';

import '@styles/Documentation.css';

interface KindComponentProps {
  kind: GraphQLKind;
}

export const KindComponent: FC<KindComponentProps> = ({ kind }) => {
  const { name, description } = kind;

  return (
    <section className='docs-container' data-testid='kind-item'>
      <h2 className='docs-title'>
        {name ? name : 'No kind name'}: {kind.kind}
      </h2>
      <p className='docs-description'>
        {description || NO_DESCRIPTION_MESSAGE}
      </p>
    </section>
  );
};
