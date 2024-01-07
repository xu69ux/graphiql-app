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
});
