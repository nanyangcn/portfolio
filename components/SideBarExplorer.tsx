import { useState } from 'react';
import { VscRefresh } from 'react-icons/vsc';

import SideBarExplorerItem from './SideBarExplorerTree';

function SideBarExplorer() {
  const [queryIter, setQueryIter] = useState(0);
  return (
    <div className="group flex h-full flex-col hover:cursor-pointer">
      <div className="flex h-12 items-center justify-between p-4">
        <div className="pl-4 text-lg font-bold text-text-primary">
          EXPLORER
        </div>
        <button
          type="button"
          className="rounded-lg p-1 hover:cursor-pointer hover:bg-border-primary"
          onClick={() => setQueryIter((prev) => (prev + 1) % 32768)}
        >
          <VscRefresh size={20} />
        </button>
      </div>
      <div className="scroll overflow-y-auto pb-20">
        <SideBarExplorerItem sha="main" queryIter={queryIter} />
      </div>
    </div>
  );
}

export default SideBarExplorer;
