import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { EditorWindow } from '../components';

import {
  IoSettingsSharp,
  IoFileTrayFullOutline,
  IoAddSharp,
  IoChevronUpOutline,
} from 'react-icons/io5';

import '@styles/GraphiQLPage.css';

export const GraphiQLPage = () => {
  const navigate = useNavigate();
  const user = 'user';

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
        <IoAddSharp className='sidebar-icon add' />
      </div>
      <div className='container code'>
        <div className='editor'>
          <EditorWindow />
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
