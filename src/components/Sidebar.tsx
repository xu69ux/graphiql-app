import { useState } from 'react';
import { translations } from '@contexts/translations';
import { IoFileTrayFullOutline, IoSettingsSharp } from 'react-icons/io5';
import { LuFilePlus2, LuFileMinus2, LuFileX2 } from 'react-icons/lu';
import { IconButton, ModalWindow } from '@components/index';
import { GraphQLSchema, IEditorTab } from '@appTypes/types';
import { removeTab } from '@utils/tabUtils';
import useLanguage from '@hooks/useLanguage';

import '@styles/Sidebar.css';

interface SidebarProps {
  schema: GraphQLSchema | null;
  tabs: IEditorTab[];
  activeTab: number | null;
  isDocumentationOpen: boolean;
  setTabs: React.Dispatch<React.SetStateAction<IEditorTab[]>>;
  setActiveTab: React.Dispatch<React.SetStateAction<number | null>>;
  setIsDocumentationOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Sidebar: React.FC<SidebarProps> = ({
  schema,
  tabs,
  activeTab,
  isDocumentationOpen,
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

  const handleCloseTab = () => {
    if (activeTab !== null) {
      removeTab(activeTab, tabs, activeTab, setTabs, setActiveTab);
    } else {
      return;
    }
  };

  return (
    <div className='sidebar' data-testid='sidebar'>
      <IconButton
        className={`sidebar-icon docs ${
          isDocumentationOpen && schema ? 'active' : ''
        } ${schema ? '' : 'disabled'}`}
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
        onClick={handleCloseTab}
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
      <ModalWindow isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};
