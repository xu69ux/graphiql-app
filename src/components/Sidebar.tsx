import { useState } from 'react';
import { translations } from '@contexts/translations';
import { IoFileTrayFullOutline, IoSettingsSharp } from 'react-icons/io5';
import { LuFilePlus2, LuFileMinus2, LuFileX2 } from 'react-icons/lu';
import { IconButton, Modal } from '@components/index';
import { IEditorTab } from '@appTypes/types';
import useLanguage from '@hooks/useLanguage';

import '@styles/Sidebar.css';

interface SidebarProps {
  tabs: IEditorTab[];
  activeTab: number | null;
  isDocumentationOpen: boolean;
  isFetchSuccessful: boolean;
  setTabs: React.Dispatch<React.SetStateAction<IEditorTab[]>>;
  setActiveTab: React.Dispatch<React.SetStateAction<number | null>>;
  setIsDocumentationOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Sidebar: React.FC<SidebarProps> = ({
  tabs,
  activeTab,
  isDocumentationOpen,
  isFetchSuccessful,
  setTabs,
  setActiveTab,
  setIsDocumentationOpen,
}) => {
  const { language } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleDocumentation = () => {
    setIsDocumentationOpen(!isDocumentationOpen);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const addTab = () => {
    const nextId = tabs.length > 0 ? tabs[tabs.length - 1].id + 1 : 1;
    const newTab: IEditorTab = {
      id: nextId,
      code: '',
      name: `untitled ${nextId}`,
    };
    setTabs((prevTabs) => [...prevTabs, newTab]);
    setActiveTab(newTab.id);
  };

  const deleteAllTabs = () => {
    const newTab: IEditorTab = {
      id: 1,
      code: '',
      name: 'untitled 1',
    };
    setActiveTab(newTab.id);
    setTabs([newTab]);
  };

  const removeTab = (id: number) => {
    setTabs((prevTabs) => {
      let newTabs = prevTabs.filter((tab) => tab.id !== id);
      if (newTabs.length === 0) {
        const newTab: IEditorTab = {
          id: 1,
          code: '',
          name: 'untitled 1',
        };
        newTabs = [newTab];
        setActiveTab(newTab.id);
      } else if (id === activeTab) {
        const newActiveTab = newTabs[newTabs.length - 1] || null;
        setActiveTab(newActiveTab ? newActiveTab.id : null);
      }

      return newTabs;
    });
  };

  return (
    <div className='sidebar' data-testid='sidebar'>
      <IconButton
        className={`sidebar-icon docs ${isDocumentationOpen ? 'active' : ''} ${
          isFetchSuccessful ? '' : 'disabled'
        }`}
        onClick={toggleDocumentation}
        title={translations[language]?.titleDocs}
      >
        <IoFileTrayFullOutline />
      </IconButton>
      <IconButton
        className='sidebar-icon add'
        title={translations[language]?.titleAddTab}
        onClick={addTab}
      >
        <LuFilePlus2 />
      </IconButton>
      <IconButton
        className={`sidebar-icon remove ${tabs.length === 1 ? 'disabled' : ''}`}
        title={translations[language]?.titleRemoveTab}
        onClick={() => removeTab(activeTab!)}
      >
        <LuFileMinus2 />
      </IconButton>
      <IconButton
        className={`sidebar-icon clear ${tabs.length === 1 ? 'disabled' : ''}`}
        title={translations[language]?.titleDeleteTabs}
        onClick={deleteAllTabs}
      >
        <LuFileX2 />
      </IconButton>
      <IconButton
        className={`sidebar-icon settings`}
        title={translations[language]?.titleSettings}
        onClick={openModal}
      >
        <IoSettingsSharp />
      </IconButton>
      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};
