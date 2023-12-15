import { useState, useCallback } from 'react';
import {
  EditorWindow,
  EditorTab,
  Documentation,
  Endpoint,
} from '../components';

import {
  IoSettingsSharp,
  IoFileTrayFullOutline,
  IoAddSharp,
  IoChevronUpOutline,
  IoCaretForward,
} from 'react-icons/io5';

import '@styles/GraphiQLPage.css';
import { QUERY_FOR_SHEMA_FETCHING } from '../utils/constants';
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
  const [headers, setHeaders] = useState('');
  const [viewer, setViewer] = useState('');
  const [endpoint, setEndpoint] = useState('');

  const fetchShema = useCallback(async () => {
    try {
      const shema = await graphqlRequest(endpoint, QUERY_FOR_SHEMA_FETCHING);
      console.log(shema);
    } catch (error) {
      console.log(error);
    }
  }, [endpoint]);

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

  const sendGraphqlRequest = async () => {
    const activeTabTemp: IEditorTab = tabs.find(
      (item) => item.id === activeTab,
    )!;
    if (activeTabTemp.code === '') {
      return;
    }
    let res = activeTabTemp.code;
    const variablesArray = variables
      ? Object.entries(JSON.parse(variables))
      : [];
    variablesArray?.forEach((item) => {
      res = activeTabTemp.code.replaceAll(`$${item[0]}`, `${item[1]}`);
    });

    const result = (
      await graphqlRequest(endpoint, res, headers ? JSON.parse(headers) : {})
    ).data;
    setViewer(
      JSON.stringify(result).replaceAll('{', '{\n').replaceAll('}', '}\n'),
    );
  };

  const toggleDocumentation = () => {
    setIsDocumentationOpen(!isDocumentationOpen);
  };

  return (
    <div className='container'>
      <div className='sidebar'>
        <div className='sidebar-wrap'>
          <IoFileTrayFullOutline
            className={`sidebar-icon docs ${
              isDocumentationOpen ? 'active' : ''
            }`}
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
      </div>
      <div className='container-wrap'>
        <Endpoint
          endpointValue={endpoint}
          setEndpoint={setEndpoint}
          fetchShema={fetchShema}
        />
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
              <div className='headers'>
                headers
                {isFooterOpen && (
                  <EditorWindow
                    code={headers}
                    updateData={(data: string) => setHeaders(data)}
                  />
                )}
              </div>
              <IoChevronUpOutline
                className={`editor-footer-icon arrow ${
                  isFooterOpen ? 'open' : ''
                }`}
                onClick={() => setIsFooterOpen(!isFooterOpen)}
              />
            </div>
          </div>
          <button onClick={sendGraphqlRequest} className='run-button'>
            <IoCaretForward className='run-button-icon' />
          </button>
          <div className='viewer'>
            <EditorWindow code={viewer} disabled />
          </div>
        </div>
      </div>
    </div>
  );
};
