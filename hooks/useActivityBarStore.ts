import { create } from 'zustand';

interface ActivityBarStore {
  activityBarState: 'home' | 'works' | 'explorer' | 'search' | 'hide';
  setActivityBarState: (state: 'home' | 'works' | 'explorer' | 'search' | 'hide') => void;
}

const useActivityBarStore = create<ActivityBarStore>((set) => ({
  activityBarState: 'home',
  setActivityBarState: (state) => set({ activityBarState: state }),
}));

export default useActivityBarStore;
