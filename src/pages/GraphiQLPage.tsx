import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EditorWindow } from '../components';

import { IoIosClose } from 'react-icons/io';
import {
  IoSettingsSharp,
  IoFileTrayFullOutline,
  IoAddSharp,
  IoChevronUpOutline,
} from 'react-icons/io5';

import '@styles/GraphiQLPage.css';

export const GraphiQLPage = () => {
  const [tabs, setTabs] = useState([{ id: 1, code: '' }]);
  const [activeTab, setActiveTab] = useState(1);
  const navigate = useNavigate();
  const user = 'user';

  const addTab = () => {
    const nextId = tabs[tabs.length - 1].id + 1;
    const newTab = { id: nextId, code: '' };
    setTabs((prevTabs) => [...prevTabs, newTab]);
    setActiveTab(newTab.id);
  };

  const handleCodeChange = (id, newCode) => {
    setTabs((prevTabs) =>
      prevTabs.map((tab) => (tab.id === id ? { ...tab, code: newCode } : tab)),
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
              <Tab
                key={tab.id}
                id={tab.id}
                isActive={tab.id === activeTab}
                onTabClick={setActiveTab}
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
                    onCodeChange={(newCode) =>
                      handleCodeChange(tab.id, newCode)
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

const Tab = ({ id, isActive, onTabClick }) => {
  return (
    <div className='tab' onClick={() => onTabClick(id)}>
      <div className={isActive ? 'tab-title active' : 'tab-title'}>
        Tab {id}
        <div className='tab-close'>
          <IoIosClose />
        </div>
      </div>
    </div>
  );
};
