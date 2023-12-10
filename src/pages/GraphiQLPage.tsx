import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  IoSettingsSharp,
  IoFileTrayFullOutline,
  IoAddSharp,
  IoChevronUpOutline,
} from 'react-icons/io5';

import '@styles/GraphiQLPage.css';

export const GraphiQLPage = () => {
  const [lineNumbers, setLineNumbers] = useState('1');
  const navigate = useNavigate();
  const user = 'user';

  const updateLineNumbers = (event) => {
    const lines = event.target.value.split('\n').length;
    setLineNumbers(Array.from({ length: lines }, (_, i) => i + 1).join('\n'));
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
        <IoAddSharp className='sidebar-icon add' />
      </div>
      <div className='container code'>
        <div className='editor'>
          <div className='editor body'>
            <pre id='line-numbers'>{lineNumbers}</pre>
            <textarea
              id='text-area'
              onInput={updateLineNumbers}
              autoFocus
            ></textarea>
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
