import { FC, MouseEvent, ChangeEvent } from 'react';
import { IoIosClose } from 'react-icons/io';

import '@styles/EditorTab.css';
interface IEditorTabProps {
  id: number;
  name: string;
  isActive: boolean;
  onTabClick: (id: number) => void;
  onCloseClick: (id: number) => void;
  onNameChange: (id: number, name: string) => void;
  totalTabs: number;
}

export const EditorTab: FC<IEditorTabProps> = ({
  id,
  name,
  isActive,
  onTabClick,
  onCloseClick,
  onNameChange,
  totalTabs,
}) => {
  const onTabSelected = (event: MouseEvent) => {
    event.stopPropagation();
    onTabClick(id);
  };

  const onTabClose = (event: MouseEvent) => {
    event.stopPropagation();
    if (totalTabs > 1) {
      onCloseClick(id);
    }
  };

  const onTabNameUpdated = (event: ChangeEvent<HTMLInputElement>) => {
    onNameChange(id, event.target.value);
  };

  return (
    <div className='tab' onClick={onTabSelected}>
      <div className={isActive ? 'tab-title active' : 'tab-title'}>
        <input
          className='tab-title-input'
          value={name}
          onChange={onTabNameUpdated}
        />
        <IoIosClose
          className={`tab-close ${totalTabs === 1 ? 'disabled' : ''}`}
          onClick={onTabClose}
        />
      </div>
    </div>
  );
};
