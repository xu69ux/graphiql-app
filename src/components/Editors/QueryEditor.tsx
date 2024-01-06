import { FC, SetStateAction, Dispatch } from 'react';
import { IEditorTab } from '../../types/types';
import { prettify } from '../../utils/prettifying';

import { EditorTab, EditorWindow } from '../../components';

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
    </>
  );
};
