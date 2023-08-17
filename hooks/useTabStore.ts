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

const useTabStore = create<TabStore>((set) => ({
  tabs: [{
    isActive: true,
    title: 'Home',
    icon: '/avatar.jpeg',
    type: 'home',
  }],
  pushTab: (tab) => set((state) => ({
    tabs: [
      ...state.tabs,
      tab,
    ],
  })),
  replaceTab: (tab) => set((state) => ({
    tabs: [
      ...state.tabs.slice(0, state.tabs.length - 1),
      tab,
    ],
  })),
  removeTab: (index) => set((state) => ({
    tabs: [
      ...state.tabs.slice(0, index),
      ...state.tabs.slice(index + 1),
    ],
  })),
  setActiveTab: (index) => set((state) => ({
    tabs: [
      ...state.tabs.slice(0, index),
      { ...state.tabs[index], isActive: true } as Tab,
      ...state.tabs.slice(index + 1),
    ],
  })),
  clearTabs: () => set(() => ({ tabs: [] })),
}));

export default useTabStore;
