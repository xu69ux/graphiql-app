import { FC, SetStateAction, Dispatch } from 'react';
import { IEditorTab } from '@appTypes/types';
import { prettify } from '@utils/prettifying';
import { removeTab } from '@utils/tabUtils';
import { EditorTab, EditorWindow } from '@components/index';

import { IoRemoveCircle, IoSparklesOutline } from 'react-icons/io5';

import '@styles/QueryEditor.css';

interface IQueryEditorProps {
  activeTab: number | null;
  setActiveTab: Dispatch<SetStateAction<number | null>>;
  tabs: IEditorTab[];
  setTabs: Dispatch<SetStateAction<IEditorTab[]>>;
}

export const QueryEditor: FC<IQueryEditorProps> = ({
  activeTab,
  setActiveTab,
  tabs,
  setTabs,
}) => {
  const updateTab = (
    tabs: IEditorTab[],
    id: number,
    newValues: Partial<IEditorTab>,
  ): IEditorTab[] =>
    tabs.map((tab) => (tab.id === id ? { ...tab, ...newValues } : tab));

  const updateData = (data: string) => {
    if (activeTab !== null) {
      setTabs((prevTabs) => updateTab(prevTabs, activeTab, { code: data }));
    }
  };

  const handleNameChange = (id: number, newName: string) => {
    setTabs((prevTabs) => updateTab(prevTabs, id, { name: newName }));
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

  const handleCloseTab = (id: number) => {
    if (activeTab !== null) {
      removeTab(id, tabs, activeTab, setTabs, setActiveTab);
    } else {
      return;
    }
  };

  return (
    <>
      <div className='tab-names'>
        {tabs.map((tab) => (
          <EditorTab
            key={tab.id}
            id={tab.id}
            name={tab.name}
            isActive={tab.id === activeTab}
            onTabClick={setActiveTab}
            onCloseClick={handleCloseTab}
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
            data-testid='prettify-button'
          />
          <IoRemoveCircle
            className='sidebar-icon add'
            title='clear text area'
            onClick={handleClearCode}
            data-testid='clear-button'
          />
        </div>
      </div>
    </>
  );
};
