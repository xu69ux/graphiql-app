import { IoSettingsSharp, IoFileTrayFullOutline } from 'react-icons/io5';
import { LuFilePlus2, LuFileMinus2, LuFileX2 } from 'react-icons/lu';
import { IEditorTab } from '../types';

import '@styles/Sidebar.css';

interface SidebarProps {
  tabs: IEditorTab[];
  activeTab: number | null;
  isDocumentationOpen: boolean;
  setTabs: React.Dispatch<React.SetStateAction<IEditorTab[]>>;
  setActiveTab: React.Dispatch<React.SetStateAction<number | null>>;
  setIsDocumentationOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Sidebar: React.FC<SidebarProps> = ({
  tabs,
  activeTab,
  isDocumentationOpen,
  setTabs,
  setActiveTab,
  setIsDocumentationOpen,
}) => {
  const toggleDocumentation = () => {
    setIsDocumentationOpen(!isDocumentationOpen);
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
    <div className='sidebar'>
      <IoFileTrayFullOutline
        className={`sidebar-icon docs ${isDocumentationOpen ? 'active' : ''}`}
        onClick={toggleDocumentation}
        title='show documentation'
      />
      <LuFilePlus2
        className='sidebar-icon add'
        title='add tab'
        onClick={addTab}
      />
      <LuFileMinus2
        className={`sidebar-icon remove ${tabs.length === 1 ? 'disabled' : ''}`}
        title='remove tab'
        onClick={() => removeTab(activeTab!)}
      />
      <LuFileX2
        className={`sidebar-icon clear ${tabs.length === 1 ? 'disabled' : ''}`}
        title='delete all tabs'
        onClick={deleteAllTabs}
      />
      <IoSettingsSharp className='sidebar-icon settings' title='settings' />
    </div>
  );
};
