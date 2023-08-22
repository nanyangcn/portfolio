import { create } from 'zustand';

import { WorkMeta } from 'data/worksMeta';

export interface Tab {
  title: string
  icon: string | JSX.Element
  isActive?: boolean
  meta: {
    type: 'home'
  } | {
    type: 'work'
    workMeta: WorkMeta
  } | {
    type: 'text'
    sha: string
    path: string
    decodedText: string
  }
}

interface TabStore {
  tabs: Tab[]
  pushTab: (tab: Tab) => void
  replaceTab: (tab: Tab) => void
  removeTab: (index: number) => void
  setActiveTab: (index: number) => void
  clearTabs: () => void
}
const activeOnlyNthTab = (tabs: Tab[], n: number) => (
  tabs.map((tab, i) => ({
    ...tab,
    isActive: i === n,
  }))
);

const findIndexInTabs = (tabs: Tab[], tab: Tab) => {
  if (tab.meta.type === 'text') {
    return tabs.findIndex((t) => (t.meta.type === 'text' && tab.meta.type === 'text') && t.meta.sha === tab.meta.sha);
  }
  return tabs.findIndex((t) => t.title === tab.title);
};

const useTabStore = create<TabStore>((set) => ({
  tabs: [{
    isActive: true,
    title: 'Home',
    icon: '/avatar.jpeg',
    meta: {
      type: 'home',
    },
  }],
  pushTab: (tab) => set((state) => {
    const index = findIndexInTabs(state.tabs, tab);
    if (index !== -1) {
      return ({ tabs: activeOnlyNthTab(state.tabs, index) });
    }
    return ({
      tabs: activeOnlyNthTab([
        ...state.tabs,
        tab,
      ], state.tabs.length),
    });
  }),
  replaceTab: (tab) => set((state) => {
    const index = findIndexInTabs(state.tabs, tab);
    if (index !== -1) {
      return ({ tabs: activeOnlyNthTab(state.tabs, index) });
    }
    return ({
      tabs: activeOnlyNthTab([
        ...state.tabs.slice(0, state.tabs.length - 1),
        tab,
      ], state.tabs.length - 1),
    });
  }),
  removeTab: (index) => set((state) => {
    const newTabs = [...state.tabs];
    newTabs.splice(index, 1);
    if (!state.tabs[index]?.isActive) return ({ tabs: newTabs });
    if (index === state.tabs.length - 1) return ({ tabs: activeOnlyNthTab(newTabs, index - 1) });
    return ({ tabs: activeOnlyNthTab(newTabs, index) });
  }),
  setActiveTab: (index) => set((state) => ({
    tabs: activeOnlyNthTab(state.tabs, index),
  })),
  clearTabs: () => set(() => ({ tabs: [] })),
}));

export default useTabStore;
