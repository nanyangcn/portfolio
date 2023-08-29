import { create } from 'zustand';

interface ActivityBarStore {
  activityBarState: 'home' | 'works' | 'explorer' | 'search';
  setActivityBarState: (state: 'home' | 'works' | 'explorer' | 'search') => void;
  isActivityBarOpen: boolean;
  setIsActivityBarOpen: (state: boolean) => void;
}

const useActivityBarStore = create<ActivityBarStore>((set) => ({
  activityBarState: 'home',
  setActivityBarState: (state) => set({ activityBarState: state }),
  isActivityBarOpen: true,
  setIsActivityBarOpen: (state) => set({ isActivityBarOpen: state }),
}));

export default useActivityBarStore;
