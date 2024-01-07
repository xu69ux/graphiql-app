import { useState, useCallback, useEffect } from 'react';
import { QUERY_FOR_SHEMA_FETCHING } from '@constants/constants';
import { graphqlRequest } from '@utils/graphqlApi';
import { translations } from '@contexts/translations';
import { GraphQLSchema, IEditorTab } from '@appTypes/types';
import useLanguage from '@hooks/useLanguage';
import useShowMessage from '@hooks/useShowMessage';
import useMsg from '@hooks/useMsg';

import {
  QueryEditor,
  VarsHeadersEditor,
  EditorWindow,
  Documentation,
  Endpoint,
  Sidebar,
} from '@components/index';

import { IoCaretForward } from 'react-icons/io5';

import '@styles/GraphiQLPage.css';

const GraphiQLPage = () => {
  const [tabs, setTabs] = useState([{ id: 1, code: '', name: `untitled 1` }]);
  const [activeTab, setActiveTab] = useState<number | null>(1);
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
      console.log(response);
      setSchema(response.data.__schema);
      saveEndpoint(endpoint);
      setIsFetchSuccessful(true);
    } catch (error) {
      console.error(error);
      setIsFetchSuccessful(false);
      showMessage(msg.SCHEMA_INVALID);
    }
  }, [endpoint, msg.SCHEMA_INVALID, saveEndpoint, showMessage]);

  useEffect(() => {
    fetchShema();
  }, [fetchShema]);

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
            <QueryEditor
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              tabs={tabs}
              setTabs={setTabs}
            />
            <VarsHeadersEditor
              headers={headers}
              setHeaders={setHeaders}
              variables={variables}
              setVariables={setVariables}
            />
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
