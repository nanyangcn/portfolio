import { create } from 'zustand';

interface SearchStore {
  keywordState: string;
  setKeywordState: (keywordState: string) => void;
}

const useSearchStore = create<SearchStore>((set) => ({
  keywordState: '',
  setKeywordState: (keywordState) => set({ keywordState }),
}));

export default useSearchStore;
