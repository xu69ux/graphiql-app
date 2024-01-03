import { FC } from 'react';
import { GraphQLType, GraphQLField } from '../../../types';
import { IoChevronForward } from 'react-icons/io5';

import '@styles/BackButton.css';

interface IBackButtonProps {
  className?: string;
  selectedType: GraphQLType | null;
  selectedField: GraphQLField | null;
  selectedKind: GraphQLType | null;
  setSelectedType: (type: GraphQLType | null) => void;
  setSelectedField: (field: GraphQLField | null) => void;
  setSelectedKind: (kind: GraphQLType | null) => void;
}

export const BackButton: FC<IBackButtonProps> = ({
  className,
  selectedType,
  selectedField,
  selectedKind,
  setSelectedType,
  setSelectedField,
  setSelectedKind,
}) => {
  const handleBackClick = () => {
    if (selectedKind) {
      setSelectedKind(null);
    } else if (selectedField) {
      setSelectedField(null);
    } else if (selectedType) {
      setSelectedType(null);
    }
  };

  return (
    <button
      className={`back-button ${className ? className : ''}`}
      onClick={handleBackClick}
      data-testid='back-button'
    >
      <IoChevronForward className='back-icon' />
      <IoChevronForward className='back-icon' />
      <IoChevronForward className='back-icon' />
      <span>
        {selectedKind
          ? selectedField
            ? 'Back to Fields'
            : 'Back to Types'
          : selectedField
            ? 'Back to Fields'
            : 'Back to Types'}
      </span>
    </button>
  );
};
