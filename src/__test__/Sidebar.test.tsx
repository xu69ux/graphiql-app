import { render, fireEvent } from './test-utils';
import { Sidebar } from '@components/index';

test('renders Sidebar without crashing', () => {
  const tabs = [];
  const activeTab = null;
  const isDocumentationOpen = false;
  const isFetchSuccessful = true;
  const setTabs = jest.fn();
  const setActiveTab = jest.fn();
  const setIsDocumentationOpen = jest.fn();

  render(
    <Sidebar
      tabs={tabs}
      activeTab={activeTab}
      isDocumentationOpen={isDocumentationOpen}
      isFetchSuccessful={isFetchSuccessful}
      setTabs={setTabs}
      setActiveTab={setActiveTab}
      setIsDocumentationOpen={setIsDocumentationOpen}
    />,
  );
});

test('addTab function works correctly', () => {
  const setTabs = jest.fn();
  const setActiveTab = jest.fn();
  const { getByTitle } = render(
    <Sidebar
      tabs={[]}
      activeTab={null}
      isDocumentationOpen={false}
      isFetchSuccessful={true}
      setTabs={setTabs}
      setActiveTab={setActiveTab}
      setIsDocumentationOpen={jest.fn()}
    />,
  );

  fireEvent.click(getByTitle(/Add Tab/i));
  expect(setTabs).toHaveBeenCalled();
  expect(setActiveTab).toHaveBeenCalled();
});

test('toggleDocumentation function works correctly', () => {
  const setIsDocumentationOpen = jest.fn();
  const { getByTitle } = render(
    <Sidebar
      tabs={[]}
      activeTab={null}
      isDocumentationOpen={false}
      isFetchSuccessful={true}
      setTabs={jest.fn()}
      setActiveTab={jest.fn()}
      setIsDocumentationOpen={setIsDocumentationOpen}
    />,
  );

  fireEvent.click(getByTitle(/Documentation/i));
  expect(setIsDocumentationOpen).toHaveBeenCalled();
});

test('settings modal opens correctly', () => {
  const { getByTitle, getByTestId } = render(
    <Sidebar
      tabs={[]}
      activeTab={null}
      isDocumentationOpen={false}
      isFetchSuccessful={true}
      setTabs={jest.fn()}
      setActiveTab={jest.fn()}
      setIsDocumentationOpen={jest.fn()}
    />,
  );

  fireEvent.click(getByTitle(/Settings/i));
  expect(getByTestId('modal-window')).toBeInTheDocument();
});
