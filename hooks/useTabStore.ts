import { create } from 'zustand';

interface Tab {
  isActive: boolean
  title: string
  icon: string
  type: 'home' | 'work' | 'text'
  sha?: string
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

const useTabStore = create<TabStore>((set) => ({
  tabs: [{
    isActive: true,
    title: 'Home',
    icon: '/avatar.jpeg',
    type: 'home',
  },
  {
    isActive: false,
    title: 'test.tsx',
    icon: '/avatar.jpeg',
    type: 'text',
  },
  ],
  pushTab: (tab) => set((state) => ({
    tabs: activeOnlyNthTab([
      ...state.tabs,
      tab,
    ], state.tabs.length - 1),
  })),
  replaceTab: (tab) => set((state) => ({
    tabs: activeOnlyNthTab([
      ...state.tabs.slice(0, state.tabs.length - 1),
      tab,
    ], state.tabs.length - 1),
  })),
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
