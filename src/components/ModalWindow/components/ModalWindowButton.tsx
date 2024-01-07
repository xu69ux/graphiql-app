import { FC } from 'react';

import '@styles/ModalWindowButton.css';

interface ModalWindowButtonProps {
  title: string;
  value: string;
  onClick: () => void;
}

export const ModalWindowButton: FC<ModalWindowButtonProps> = ({
  title,
  value,
  onClick,
}) => (
  <div className='setting'>
    <h4>{title}:</h4>
    <button className='setting-btn' onClick={onClick}>
      {value}
    </button>
  </div>
);
