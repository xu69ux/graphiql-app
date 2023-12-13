import { useEffect, useState } from 'react';
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
  name: string;
}

export const GraphiQLPage = () => {
  const [tabs, setTabs] = useState([{ id: 1, code: '', name: `untitled 1` }]);
  const [activeTab, setActiveTab] = useState<number | null>(1);
  const [isFooterOpen, setIsFooterOpen] = useState(false);

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

//   useEffect(() => {
//     if (loading) {
//       return;
//     }
//     fetchData();
//     if (!user) {
//       navigate('/');
//     }
//   }, [user, loading]);

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
            <div className='variables'>variables</div>
            <div className='headers'>headers</div>
            <IoChevronUpOutline
              className={`editor-footer-icon arrow ${
                isFooterOpen ? 'open' : ''
              }`}
              onClick={() => setIsFooterOpen(!isFooterOpen)}
            />
          </div>
        </div>
        <div className='viewer'></div>
      </div>
    </div>
  );
};
