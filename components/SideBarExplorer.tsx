import { useState } from 'react';
import { VscRefresh } from 'react-icons/vsc';

import useCurrentRepoStore from 'hooks/useCurrentRepoStore';

import SideBarExplorerTree from './SideBarExplorerTree';

function SideBarExplorer() {
  const [queryIter, setQueryIter] = useState(0);
  const { ownerState, repoState } = useCurrentRepoStore();
  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex h-12 items-center justify-between p-4">
        <div className="truncate pl-4 text-lg font-bold text-text-primary">
          EXPLORER:
          <span>{` ${ownerState}/${repoState}`}</span>
        </div>
        <button
          type="button"
          className="rounded-lg p-1 hover:cursor-pointer hover:bg-border-primary"
          onClick={() => setQueryIter((prev) => (prev + 1) % 32768)}
        >
          <VscRefresh size={20} />
        </button>
      </div>
      <div className="scroll group grow overflow-y-auto pr-8">
        <SideBarExplorerTree sha="main" queryIter={queryIter} />
      </div>
    </div>
  );
}

export default SideBarExplorer;
