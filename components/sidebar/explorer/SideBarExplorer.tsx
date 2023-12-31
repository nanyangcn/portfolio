import { useState } from 'react';
import { VscCollapseAll, VscRefresh } from 'react-icons/vsc';

import useCurrentRepoStore from 'hooks/useCurrentRepoStore';

import SideBarExplorerTree from './SideBarExplorerTree';
import RateLimitNotification from '../../RateLimitNotification';

function SideBarExplorer() {
  const [queryIter, setQueryIter] = useState(0);
  const [idFoldAll, setIdFoldAll] = useState(false);
  const { repoState } = useCurrentRepoStore();

  const handleRefresh = async () => {
    setQueryIter((prev) => (prev + 1) % 32768);
  };

  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex h-12 items-center justify-between p-4">
        <div className="truncate px-4 text-lg font-bold text-text-primary">
          EXPLORER:
          <span>{` ${repoState}`}</span>
        </div>
        <div className="flex gap-x-1">
          <button
            type="button"
            title="Refresh"
            className="rounded-lg p-1 hover:cursor-pointer hover:bg-border-primary"
            onClick={handleRefresh}
            aria-label="Refresh"
          >
            <VscRefresh size={20} />
          </button>
          <button
            type="button"
            title="Collapse All"
            className="rounded-lg p-1 hover:cursor-pointer hover:bg-border-primary"
            onClick={() => setIdFoldAll((prev) => (prev === null ? true : !prev))}
            aria-label="Collapse All"
          >
            <VscCollapseAll size={20} />
          </button>
        </div>
      </div>
      <RateLimitNotification rateType="rate" />
      <div className="scroll group grow overflow-y-auto pr-8">
        <SideBarExplorerTree
          sha="main"
          queryIter={queryIter}
          idFoldAll={idFoldAll}
          setIsFoldAll={setIdFoldAll}
        />
      </div>
    </div>
  );
}

export default SideBarExplorer;
