import { create } from 'zustand';

interface ActivityBarStore {
  activityBarState: 'profile' | 'works' | 'explorer' | 'search';
  setActivityBarState: (state: 'profile' | 'works' | 'explorer' | 'search') => void;
  isActivityBarOpen: boolean;
  setIsActivityBarOpen: (state: boolean) => void;
}

const useActivityBarStore = create<ActivityBarStore>((set) => ({
  activityBarState: 'profile',
  setActivityBarState: (state) => set({ activityBarState: state }),
  isActivityBarOpen: true,
  setIsActivityBarOpen: (state) => set({ isActivityBarOpen: state }),
}));

export default useActivityBarStore;
