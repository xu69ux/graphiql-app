import { FC } from 'react';

import '@styles/ModalWindowSetting.css';

interface ModalWindowSettingProps {
  title: string;
  value: string;
  onClick: () => void;
}

export const ModalWindowSetting: FC<ModalWindowSettingProps> = ({
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
