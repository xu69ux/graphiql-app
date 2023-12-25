import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { LanguageContext } from '../contexts/LanguageContext';
import { LanguageProvider } from '../contexts/LanguageProvider';

const TestComponent = () => {
  const { language, setLanguage } = React.useContext(LanguageContext)!;

  return (
    <div>
      <div>{language}</div>
      <button onClick={() => setLanguage('new language')}>
        Change Language
      </button>
    </div>
  );
};

test('LanguageProvider provides initial language and changes it', () => {
  render(
    <LanguageProvider>
      <TestComponent />
    </LanguageProvider>,
  );

  expect(screen.getByText('eng')).toBeInTheDocument();

  fireEvent.click(screen.getByText('Change Language'));
  expect(screen.getByText('new language')).toBeInTheDocument();
});
