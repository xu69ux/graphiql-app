import { render, fireEvent } from '@testing-library/react';
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

test('addTab function works correctly', () => {
  const setTabs = jest.fn();
  const setActiveTab = jest.fn();
  const { getByTitle } = render(
    <LanguageContext.Provider
      value={{ language: 'eng', setLanguage: () => {} }}
    >
      <Sidebar
        tabs={[]}
        activeTab={null}
        isDocumentationOpen={false}
        isFetchSuccessful={true}
        setTabs={setTabs}
        setActiveTab={setActiveTab}
        setIsDocumentationOpen={jest.fn()}
      />
    </LanguageContext.Provider>,
  );

  fireEvent.click(getByTitle(/Add Tab/i));
  expect(setTabs).toHaveBeenCalled();
  expect(setActiveTab).toHaveBeenCalled();
});

test('toggleDocumentation function works correctly', () => {
  const setIsDocumentationOpen = jest.fn();
  const { getByTitle } = render(
    <LanguageContext.Provider
      value={{ language: 'eng', setLanguage: () => {} }}
    >
      <Sidebar
        tabs={[]}
        activeTab={null}
        isDocumentationOpen={false}
        isFetchSuccessful={true}
        setTabs={jest.fn()}
        setActiveTab={jest.fn()}
        setIsDocumentationOpen={setIsDocumentationOpen}
      />
    </LanguageContext.Provider>,
  );

  fireEvent.click(getByTitle(/Documentation/i));
  expect(setIsDocumentationOpen).toHaveBeenCalled();
});
