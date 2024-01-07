import { FC } from 'react';
import { IoChevronForward } from 'react-icons/io5';
import { GraphQLField, GraphQLType, GraphQLKind } from '@appTypes/types';

import '@styles/BackButton.css';

export interface IBackButtonProps {
  className?: string;
  selectedType: GraphQLType | null;
  setSelectedType: (type: GraphQLType | null) => void;
  selectedField: GraphQLField | null;
  setSelectedField: (field: GraphQLField | null) => void;
  selectedKind: GraphQLKind | null;
  setSelectedKind: (kind: GraphQLKind | null) => void;
}

export const BackButton: FC<IBackButtonProps> = ({
  className,
  selectedType,
  setSelectedType,
  selectedField,
  setSelectedField,
  selectedKind,
  setSelectedKind,
}) => {
  const handleBackClick = () => {
    if ((selectedKind && selectedType) || selectedField) {
      setSelectedType(selectedType);
    } else if (selectedType) {
      setSelectedType(null);
    }
    setSelectedField(null);
    setSelectedKind(null);
  };

  return (
    <button
      className={`back-button ${className ? className : ''}`}
      onClick={handleBackClick}
      data-testid='back-button'
    >
      <IoChevronForward className='back-icon' data-testid='back-button-icon' />
      <IoChevronForward className='back-icon' />
      <IoChevronForward className='back-icon' />
      {selectedField
        ? 'Back to Fields'
        : selectedType
          ? 'Back to Types'
          : selectedKind
            ? 'Back to Schema'
            : null}
    </button>
  );
};
