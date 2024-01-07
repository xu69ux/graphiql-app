import { render, fireEvent } from './test-utils';
import { QueryEditor } from '@components/index';
import { IEditorTab } from '@appTypes/types';

describe('QueryEditor', () => {
  it('renders without crashing', () => {
    const mockSetTabs = jest.fn();
    const mockSetActiveTab = jest.fn();
    const mockTabs: IEditorTab[] = [
      { id: 1, code: '', name: 'untitled 1' },
      { id: 2, code: '', name: 'untitled 2' },
    ];

    render(
      <QueryEditor
        activeTab={1}
        setActiveTab={mockSetActiveTab}
        tabs={mockTabs}
        setTabs={mockSetTabs}
      />,
    );
  });

  it('calls setActiveTab when a tab is clicked', () => {
    const mockSetTabs = jest.fn();
    const mockSetActiveTab = jest.fn();
    const mockTabs: IEditorTab[] = [
      { id: 1, code: '', name: 'untitled 1' },
      { id: 2, code: '', name: 'untitled 2' },
    ];

    const { getByTestId } = render(
      <QueryEditor
        activeTab={1}
        setActiveTab={mockSetActiveTab}
        tabs={mockTabs}
        setTabs={mockSetTabs}
      />,
    );

    fireEvent.click(getByTestId('tab-2'));
    expect(mockSetActiveTab).toHaveBeenCalledWith(2);
  });

  it('calls setTabs with new name when tab name is changed', () => {
    const mockSetTabs = jest.fn();
    const mockSetActiveTab = jest.fn();
    const mockTabs: IEditorTab[] = [
      { id: 1, code: '', name: 'untitled 1' },
      { id: 2, code: '', name: 'untitled 2' },
    ];

    const { getByTestId } = render(
      <QueryEditor
        activeTab={1}
        setActiveTab={mockSetActiveTab}
        tabs={mockTabs}
        setTabs={mockSetTabs}
      />,
    );

    const inputElement = getByTestId('tab-1').querySelector('input');
    if (inputElement) {
      fireEvent.change(inputElement, { target: { value: 'new name' } });
    } else {
      throw new Error('Input element not found');
    }
  });

  it('handleHighlightedCode formats the code of the active tab', () => {
    const { getByTestId } = render(
      <QueryEditor
        activeTab={1}
        setActiveTab={jest.fn()}
        tabs={[{ id: 1, code: 'query {}', name: 'untitled 1' }]}
        setTabs={jest.fn()}
      />,
    );

    const highlightedCode = getByTestId('highlighted-code');
    const keywordSpan = highlightedCode.querySelector('span.keyword');

    expect(keywordSpan).not.toBeNull();
    expect(keywordSpan?.textContent).toBe('query');
  });

  it('clears the code of the active tab when handleClearCode is called', () => {
    const tabs = [{ id: 1, code: 'query {}', name: 'untitled 1' }];
    const setTabs = jest.fn((updateFunction) => {
      const newTabs = updateFunction(tabs);
      expect(newTabs).toEqual([{ id: 1, code: '', name: 'untitled 1' }]);
    });
    const setActiveTab = jest.fn();
    const { getByTestId } = render(
      <QueryEditor
        activeTab={1}
        setActiveTab={setActiveTab}
        tabs={tabs}
        setTabs={setTabs}
      />,
    );

    const clearButton = getByTestId('clear-button');
    fireEvent.click(clearButton);
  });
});
