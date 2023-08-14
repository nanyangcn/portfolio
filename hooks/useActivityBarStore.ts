import { create } from 'zustand';

interface ActivityBarStore {
  activityBarState: 'home' | 'works' | 'explorer' | 'search' | null;
  setActivityBarState: (state: 'home' | 'works' | 'explorer' | 'search' | null) => void;
}

const useActivityBarStore = create<ActivityBarStore>((set) => ({
  activityBarState: 'home',
  setActivityBarState: (state) => set({ activityBarState: state }),
}));

export default useActivityBarStore;
