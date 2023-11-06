import { create } from 'zustand';

export type Activity = 'profile' | 'works' | 'explorer' | 'search';
interface ActivityBarStore {
  activityBarState: Activity;
  setActivityBarState: (state: Activity) => void;
  isActivityBarOpen: boolean;
  setIsActivityBarOpen: (state: boolean) => void;
}

const useActivityBarStore = create<ActivityBarStore>((set) => ({
  activityBarState: 'profile',
  setActivityBarState: (state) => {
    set({ activityBarState: state });
  },
  isActivityBarOpen: true,
  setIsActivityBarOpen: (state) => {
    set({ isActivityBarOpen: state });
  },
}));

export default useActivityBarStore;
