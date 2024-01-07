import { removeTab } from '@utils/tabUtils';
import { IEditorTab } from '@appTypes/types';

describe('removeTab', () => {
  it('should remove the specified tab and update the active tab', () => {
    const setTabs = jest.fn();
    const setActiveTab = jest.fn();

    const tabs: IEditorTab[] = [
      { id: 1, code: '', name: 'untitled 1' },
      { id: 2, code: '', name: 'untitled 2' },
    ];
    const activeTab = 1;

    removeTab(1, tabs, activeTab, setTabs, setActiveTab);

    expect(setTabs).toHaveBeenCalledWith([
      { id: 2, code: '', name: 'untitled 2' },
    ]);
    expect(setActiveTab).toHaveBeenCalledWith(2);
  });

  it('should create a new tab if all tabs are removed', () => {
    const setTabs = jest.fn();
    const setActiveTab = jest.fn();

    const tabs: IEditorTab[] = [{ id: 1, code: '', name: 'untitled 1' }];
    const activeTab = 1;

    removeTab(1, tabs, activeTab, setTabs, setActiveTab);

    expect(setTabs).toHaveBeenCalledWith([
      { id: 1, code: '', name: 'untitled 1' },
    ]);
    expect(setActiveTab).toHaveBeenCalledWith(1);
  });
});
