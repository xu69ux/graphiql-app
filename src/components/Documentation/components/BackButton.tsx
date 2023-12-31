import { FC } from 'react';
import { Type, FieldType } from '../../../types';
import { IoChevronForward } from 'react-icons/io5';

import '@styles/BackButton.css';

interface IBackButtonProps {
  className?: string;
  selectedType?: Type | null;
  selectedField?: FieldType | null;
  selectedKind?: string | null;
  setSelectedType?: (type: Type | null) => void;
  setSelectedField?: (field: FieldType | null) => void;
  setSelectedKind?: (kind: string | null) => void;
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
    if (selectedField && setSelectedField) {
      setSelectedField(null);
    } else if (selectedKind && setSelectedKind) {
      setSelectedKind(null);
    } else if (selectedType && setSelectedType) {
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
