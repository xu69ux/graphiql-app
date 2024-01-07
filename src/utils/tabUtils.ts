import { IEditorTab } from '@appTypes/types';

type SetTabs = (tabs: IEditorTab[]) => void;
type SetActiveTab = (activeTab: number | null) => void;

export const removeTab = (
  id: number,
  tabs: IEditorTab[],
  activeTab: number,
  setTabs: SetTabs,
  setActiveTab: SetActiveTab,
) => {
  let newTabs = tabs.filter((tab) => tab.id !== id);
  if (newTabs.length === 0) {
    const newTab: IEditorTab = { id: 1, code: '', name: 'untitled 1' };
    newTabs = [newTab];
    setActiveTab(newTab.id);
  } else if (id === activeTab) {
    const newActiveTab = newTabs[newTabs.length - 1] || null;
    setActiveTab(newActiveTab ? newActiveTab.id : null);
  }
  setTabs(newTabs);
};
