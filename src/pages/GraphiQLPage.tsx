import { useState, useEffect } from 'react';
import { graphqlRequest } from '@utils/graphqlApi';
import { translations } from '@contexts/translations';
import { GraphQLSchema, IEditorTab } from '@appTypes/types';
import useLanguage from '@hooks/useLanguage';
import useShowMessage from '@hooks/useShowMessage';
import useMsg from '@hooks/useMsg';
import { prettify } from '@utils/prettifying';
import useLocalStorage from '@hooks/useLocalStorage';

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
  const [schema, setSchema] = useState<GraphQLSchema | null>(null);
  const { language } = useLanguage();
  const showMessage = useShowMessage();
  const { getItem } = useLocalStorage();
  const msg = useMsg();

  const updateSchema = (
    schema: GraphQLSchema | null,
    clear: boolean = false,
  ) => {
    if (clear) {
      setSchema(null);
    } else if (schema) {
      setSchema(schema);
    } else {
      showMessage(msg.SCHEMA_INVALID);
    }
  };

  const sendGraphqlRequest = async () => {
    const activeTabTemp: IEditorTab = tabs.find(
      (item) => item.id === activeTab,
    )!;
    if (!activeTabTemp.code || !schema) {
      return;
    }
    try {
      const result = await graphqlRequest(
        getItem('prevEndpoint')!,
        activeTabTemp.code,
        variables ? JSON.parse(variables) : {},
        headers ? JSON.parse(headers) : {},
      );
      setViewer(prettify(JSON.stringify(result)));
    } catch (error) {
      showMessage(msg.GRAPHIQL_API_ERROR);
    }
  };

  useEffect(() => {
    if (!schema) {
      setIsDocumentationOpen(false);
    }
  }, [schema]);

  return (
    <div className='container'>
      <Sidebar
        schema={schema}
        tabs={tabs}
        activeTab={activeTab}
        isDocumentationOpen={isDocumentationOpen}
        setTabs={setTabs}
        setActiveTab={setActiveTab}
        setIsDocumentationOpen={setIsDocumentationOpen}
      />
      <Documentation
        isDocumentationOpen={isDocumentationOpen}
        schema={schema}
      />
      <div className='container-wrap'>
        <Endpoint updateSchema={updateSchema} />
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
