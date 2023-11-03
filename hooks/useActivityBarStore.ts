import { create } from 'zustand';

import { getStateFromUrl, pushStateToUrl } from 'libs/utils';

export type Activity = 'profile' | 'works' | 'explorer' | 'search';
interface ActivityBarStore {
  activityBarState: Activity;
  setActivityBarState: (state: Activity) => void;
  isActivityBarOpen: boolean;
  setIsActivityBarOpen: (state: boolean) => void;
}

const useActivityBarStore = create<ActivityBarStore>((set) => ({
  activityBarState: getStateFromUrl({ key: 'activityBarState' }) ?? 'profile',
  setActivityBarState: (state) => {
    set({ activityBarState: state });
    pushStateToUrl({ key: 'activityBarState', value: state });
  },
  isActivityBarOpen: getStateFromUrl({ key: 'isActivityBarOpen' }) === 'true' ?? true,
  setIsActivityBarOpen: (state) => {
    set({ isActivityBarOpen: state });
    pushStateToUrl({ key: 'isActivityBarOpen', value: String(state) });
  },
}));

export default useActivityBarStore;
