import { useState } from 'react';
import { EditorWindow, EditorTab, Documentation } from '../components';

import {
  IoSettingsSharp,
  IoFileTrayFullOutline,
  IoAddSharp,
  IoChevronUpOutline,
  IoCaretForward,
} from 'react-icons/io5';

import '@styles/GraphiQLPage.css';
import { graphqlRequest } from '../utils/graphqlApi';

interface IEditorTab {
  id: number;
  code: string;
  name: string;
}

export const GraphiQLPage = () => {
  const [tabs, setTabs] = useState([{ id: 1, code: '', name: `untitled 1` }]);
  const [activeTab, setActiveTab] = useState<number | null>(1);
  const [isFooterOpen, setIsFooterOpen] = useState(false);
  const [isDocumentationOpen, setIsDocumentationOpen] = useState(false);
  const [variables, setVariables] = useState('');
  const [viewer, setViewer] = useState('');

  const updateData = (data: string) => {
    setTabs((prevTabs) =>
      prevTabs.map((tab) =>
        tab.id === activeTab ? { ...tab, code: data } : tab,
      ),
    );
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

  const removeTab = (id: number) => {
    setTabs((prevTabs) => {
      const newTabs = prevTabs.filter((tab) => tab.id !== id);

      if (id === activeTab) {
        const newActiveTab = newTabs[newTabs.length - 1] || null;
        setActiveTab(newActiveTab ? newActiveTab.id : null);
      }

      return newTabs;
    });
  };

  const handleNameChange = (id: number, newName: string) => {
    setTabs((prevTabs) =>
      prevTabs.map((tab) => (tab.id === id ? { ...tab, name: newName } : tab)),
    );
  };

  const clickHandler = () => {
    const activeTabTemp: IEditorTab = tabs.find(
      (item) => item.id === activeTab,
    )!;
    if (variables === '' || activeTabTemp.code === '') {
      return;
    }
    let res = '';
    const variablesArray = Object.entries(JSON.parse(variables));
    variablesArray?.forEach((item) => {
      res = activeTabTemp.code.replaceAll(`$${item[0]}`, `${item[1]}`);
    });
    setViewer(res);
  };

  const toggleDocumentation = () => {
    setIsDocumentationOpen(!isDocumentationOpen);
  };

  return (
    <div className='container'>
      <div className='sidebar'>
        <IoFileTrayFullOutline
          className={`sidebar-icon docs ${isDocumentationOpen ? 'active' : ''}`}
          onClick={toggleDocumentation}
          title='show documentation'
        />
        <IoSettingsSharp className='sidebar-icon settings' title='settings' />
        <IoAddSharp
          className='sidebar-icon add'
          onClick={addTab}
          title='add tab'
        />
      </div>
      <Documentation isDocumentationOpen={isDocumentationOpen} />
      <div className='container code'>
        <div className='editor'>
          <div className='tab-names'>
            {tabs.map((tab) => (
              <EditorTab
                key={tab.id}
                id={tab.id}
                name={tab.name}
                isActive={tab.id === activeTab}
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
                    updateData={updateData}
                  />
                ),
            )}
          </div>
          <div className={`editor-footer ${isFooterOpen ? 'open' : ''}`}>
            <div className='variables'>
              variables
              {isFooterOpen && (
                <EditorWindow
                  code={variables}
                  updateData={(data: string) => setVariables(data)}
                />
              )}
            </div>
            <div className='headers'>headers</div>
            <IoChevronUpOutline
              className={`editor-footer-icon arrow ${
                isFooterOpen ? 'open' : ''
              }`}
              onClick={() => setIsFooterOpen(!isFooterOpen)}
            />
          </div>
        </div>
        <button onClick={clickHandler} className='run-button'>
          <IoCaretForward className='run-button-icon' />
        </button>
        <div className='viewer'>
          <EditorWindow code={viewer} />
        </div>
      </div>
    </div>
  );
};
