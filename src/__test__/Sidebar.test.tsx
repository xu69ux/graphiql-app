import { render } from '@testing-library/react';
import { Sidebar } from '../components/Sidebar';
import { LanguageContext } from '../contexts/LanguageContext';

test('renders Sidebar without crashing', () => {
  const tabs = [];
  const activeTab = null;
  const isDocumentationOpen = false;
  const isFetchSuccessful = true;
  const setTabs = jest.fn();
  const setActiveTab = jest.fn();
  const setIsDocumentationOpen = jest.fn();

  render(
    <LanguageContext.Provider
      value={{ language: 'eng', setLanguage: () => {} }}
    >
      <Sidebar
        tabs={tabs}
        activeTab={activeTab}
        isDocumentationOpen={isDocumentationOpen}
        isFetchSuccessful={isFetchSuccessful}
        setTabs={setTabs}
        setActiveTab={setActiveTab}
        setIsDocumentationOpen={setIsDocumentationOpen}
      />
    </LanguageContext.Provider>,
  );
});
