import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EditorWindow, EditorTab } from '../components';

import {
  IoSettingsSharp,
  IoFileTrayFullOutline,
  IoAddSharp,
  IoChevronUpOutline,
} from 'react-icons/io5';

import '@styles/GraphiQLPage.css';

interface IEditorTab {
  id: number;
  code: string;
  lineNumbers: number;
  name: string;
}

export const GraphiQLPage = () => {
  const [tabs, setTabs] = useState<IEditorTab[]>([
    { id: 1, code: '', lineNumbers: 1, name: `untitled 1` },
  ]);
  const [activeTab, setActiveTab] = useState<number | null>(1);
  const navigate = useNavigate();
  const user = 'user';

  const addTab = () => {
    const nextId = tabs.length > 0 ? tabs[tabs.length - 1].id + 1 : 1;
    const newTab: IEditorTab = {
      id: nextId,
      code: '',
      lineNumbers: 1,
      name: `untitled ${nextId}`,
    };
    setTabs((prevTabs) => [...prevTabs, newTab]);
    setActiveTab(newTab.id);
  };

  const removeTab = (id: number) => {
    const newTabs = tabs.filter((tab) => tab.id !== id);
    setTabs(newTabs);

    if (id === activeTab && newTabs.length > 0) {
      setActiveTab(newTabs[0].id);
    } else if (newTabs.length === 0) {
      setActiveTab(null);
    }
  };

  const handleCodeChange = (
    id: number,
    newCode: string,
    newLineNumbers: number,
  ) => {
    setTabs((prevTabs) =>
      prevTabs.map((tab) =>
        tab.id === id
          ? { ...tab, code: newCode, lineNumbers: newLineNumbers }
          : tab,
      ),
    );
  };

  const handleNameChange = (id: number, newName: string) => {
    setTabs((prevTabs) =>
      prevTabs.map((tab) => (tab.id === id ? { ...tab, name: newName } : tab)),
    );
  };

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  useEffect(() => {
    const textArea = document.getElementById('text-area');
    if (textArea) textArea.focus();
  }, []);

  return (
    <div className='container'>
      <div className='sidebar'>
        <IoFileTrayFullOutline className='sidebar-icon docs' />
        <IoSettingsSharp className='sidebar-icon settings' />
        <IoAddSharp className='sidebar-icon add' onClick={addTab} />
      </div>
      <div className='container code'>
        <div className='editor'>
          <div className='tab-names'>
            {tabs.map((tab) => (
              <EditorTab
                key={tab.id}
                id={tab.id}
                name={tab.name}
                isActive={tab.id === activeTab}
                setActiveTab={setActiveTab}
                onTabClick={setActiveTab}
                onCloseClick={removeTab}
                onNameChange={handleNameChange}
              />
            ))}
          </div>
          <div className='tab-container'>
            {tabs.map(
              (tab) =>
                tab.id === activeTab && (
                  <EditorWindow
                    key={tab.id}
                    code={tab.code}
                    lineNumbers={tab.lineNumbers}
                    onCodeChange={(newCode, newLineNumbers) =>
                      handleCodeChange(tab.id, newCode, newLineNumbers)
                    }
                  />
                ),
            )}
          </div>
          <div className='editor-footer'>
            <div className='variables'>variables</div>
            <div className='headers'>headers</div>
            <IoChevronUpOutline className='editor-footer-icon arrow' />
          </div>
        </div>
        <div className='viewer'></div>
      </div>
    </div>
  );
};
