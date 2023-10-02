import { create } from 'zustand';

interface SearchRateLimitStore {
  remainingState: number | null;
  setRemainingState: (remainingState: number | null) => void;
  resetState: string;
  setResetState: (resetState: string) => void;
}

const useSearchRateLimitStore = create<SearchRateLimitStore>((set) => ({
  remainingState: null,
  setRemainingState: (remainingState) => set({ remainingState }),
  resetState: '',
  setResetState: (resetState) => set({ resetState }),
}));

export default useSearchRateLimitStore;
