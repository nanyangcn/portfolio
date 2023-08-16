import { create } from 'zustand';

interface CurrentRepoStore {
  ownerState: string;
  repoState: string;
  setOwnerState: (ownerState: string) => void;
  setRepoState: (repoState: string) => void;
}

const useCurrentRepoStore = create<CurrentRepoStore>((set) => ({
  ownerState: 'nanyangcn',
  repoState: 'portfolio',
  setOwnerState: (ownerState) => set({ ownerState }),
  setRepoState: (repoState) => set({ repoState }),
}));

export default useCurrentRepoStore;
