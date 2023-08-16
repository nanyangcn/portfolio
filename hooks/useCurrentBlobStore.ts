import { create } from 'zustand';

interface CurrentBlobStore {
  pathState: string;
  setPathState: (pathState: string) => void;
}

const useCurrentBlobStore = create<CurrentBlobStore>((set) => ({
  pathState: '',
  setPathState: (pathState) => set({ pathState }),
}));

export default useCurrentBlobStore;
