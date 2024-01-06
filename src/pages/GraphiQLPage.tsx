import { useState, useCallback, useEffect } from 'react';
import { QUERY_FOR_SHEMA_FETCHING } from '@constants/constants';
import { graphqlRequest } from '@utils/graphqlApi';
import { translations } from '@contexts/translations';
import {
  IoChevronUpOutline,
  IoCaretForward,
  IoSparklesOutline,
  IoRemoveCircle,
} from 'react-icons/io5';
import { prettify } from '@utils/prettifying';
import {
  EditorWindow,
  EditorTab,
  Documentation,
  Endpoint,
  Sidebar,
} from '@components/index';
import { IoChevronUpOutline, IoCaretForward } from 'react-icons/io5';
import { GraphQLSchema, IEditorTab } from '@appTypes/types';
import useLanguage from '@hooks/useLanguage';
import useShowMessage from '@hooks/useShowMessage';
import useMsg from '@hooks/useMsg';


import '@styles/GraphiQLPage.css';

const updateTab = (
  tabs: IEditorTab[],
  id: number,
  newValues: Partial<IEditorTab>,
): IEditorTab[] =>
  tabs.map((tab) => (tab.id === id ? { ...tab, ...newValues } : tab));

const GraphiQLPage = () => {
  const [tabs, setTabs] = useState([{ id: 1, code: '', name: `untitled 1` }]);
  const [activeTab, setActiveTab] = useState<number | null>(1);
  const [isFooterOpen, setIsFooterOpen] = useState(false);
  const [isDocumentationOpen, setIsDocumentationOpen] = useState(false);
  const [variables, setVariables] = useState('');
  const [headers, setHeaders] = useState('');
  const [viewer, setViewer] = useState('');
  const [endpoint, setEndpoint] = useState('');
  const [schema, setSchema] = useState<GraphQLSchema | null>(null);
  const [isFetchSuccessful, setIsFetchSuccessful] = useState(false);
  const { language } = useLanguage();
  const showMessage = useShowMessage();
  const msg = useMsg();

  const saveEndpoint = useCallback((endpoint: string) => {
    localStorage.setItem('prevEndpoint', endpoint);
  }, []);

  const fetchShema = useCallback(async (): Promise<void> => {
    if (!endpoint) {
      return;
    }
    try {
      const response = await graphqlRequest(endpoint, QUERY_FOR_SHEMA_FETCHING);
      setSchema(response.data.data.__schema);
      saveEndpoint(endpoint);
      setIsFetchSuccessful(true);
    } catch (error) {
      console.error(error);
      setIsFetchSuccessful(false);
    }
  }, [endpoint, saveEndpoint]);

  useEffect(() => {
    fetchShema();
  }, [fetchShema]);

  const updateData = (data: string) => {
    if (activeTab !== null) {
      setTabs((prevTabs) => updateTab(prevTabs, activeTab, { code: data }));
    }
  };

  const handleNameChange = (id: number, newName: string) => {
    setTabs((prevTabs) => updateTab(prevTabs, id, { name: newName }));
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

  const sendGraphqlRequest = async () => {
    const activeTabTemp: IEditorTab = tabs.find(
      (item) => item.id === activeTab,
    )!;
    if (!activeTabTemp.code) {
      return;
    }
    let res = activeTabTemp.code;
    const variablesArray = variables
      ? Object.entries(JSON.parse(variables))
      : [];
    variablesArray?.forEach((item) => {
      res = activeTabTemp.code.replaceAll(`$${item[0]}`, `${item[1]}`);
    });

    try {
      const result = await graphqlRequest(
        endpoint,
        res,
        headers ? JSON.parse(headers) : {},
      );
      setViewer(
        JSON.stringify(result.data)
          .replaceAll('{', '{\n')
          .replaceAll('}', '}\n'),
      );
    } catch (error) {
      showMessage(msg.GRAPHIQL_API_ERROR);
    }
  };

  const handleFormatCode = () => {
    const activeTabTemp: IEditorTab = tabs.find(
      (item) => item.id === activeTab,
    )!;
    if (!activeTabTemp.code) {
      return;
    }
    const formattedQuery = prettify(activeTabTemp.code);
    updateData(formattedQuery);
  };

  const handleClearCode = () => {
    const activeTabTemp: IEditorTab = tabs.find(
      (item) => item.id === activeTab,
    )!;
    if (!activeTabTemp.code) {
      return;
    }
    updateData('');
  };

  console.log('render page');

  return (
    <div className='container'>
      <Sidebar
        tabs={tabs}
        activeTab={activeTab}
        isDocumentationOpen={isDocumentationOpen}
        isFetchSuccessful={isFetchSuccessful}
        setTabs={setTabs}
        setActiveTab={setActiveTab}
        setIsDocumentationOpen={setIsDocumentationOpen}
      />
      <Documentation
        isDocumentationOpen={isDocumentationOpen}
        schema={schema}
      />
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
                  totalTabs={tabs.length}
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
              <div className='editor-toolbar'>
                <IoSparklesOutline
                  className='sidebar-icon add'
                  onClick={handleFormatCode}
                  title='prettify query'
                />
                <IoRemoveCircle
                  className='sidebar-icon add'
                  title='clear text area'
                  onClick={handleClearCode}
                />
              </div>
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
          <button
            onClick={sendGraphqlRequest}
            className='run-button'
            title={translations[language]?.titleRunQuery}
          >
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

export default GraphiQLPage;
