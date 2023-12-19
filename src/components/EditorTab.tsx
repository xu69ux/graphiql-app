import { FC, MouseEvent, ChangeEvent } from 'react';

import { IoIosClose } from 'react-icons/io';

interface IEditorTabProps {
  id: number;
  name: string;
  isActive: boolean;
  onTabClick: (id: number) => void;
  onCloseClick: (id: number) => void;
  onNameChange: (id: number, name: string) => void;
}

export const EditorTab: FC<IEditorTabProps> = ({
  id,
  name,
  isActive,
  onTabClick,
  onCloseClick,
  onNameChange,
}) => {
  const onTabSelected = (event: MouseEvent) => {
    event.stopPropagation();
    onTabClick(id);
  };

  const onTabClose = (event: MouseEvent) => {
    event.stopPropagation();
    onCloseClick(id);
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
        <IoIosClose className='tab-close' onClick={onTabClose} />
      </div>
    </div>
  );
};
