import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import Loading from 'app/loading';
import Error from 'app/error';
import getRepoTree from 'services/repoTree';

interface SideBarExplorerItemProps {
  sha: string
  path?: string
}
function SideBarExplorerItem({ sha, path = 'root' }: SideBarExplorerItemProps) {
  const [isFold, setIsFold] = useState(sha !== 'main');

  const { isLoading, data } = useQuery({
    queryKey: ['repository-tree', sha],
    queryFn: () => getRepoTree('nanyangcn', 'portfolio', sha),
  });

  if (sha === 'main') {
    if (isLoading) { return <Loading className="items-start p-4" />; }
    if (!data) return <Error className="items-start p-4" message="No Data" />;
  }

  if (isLoading) return <p>Loading...</p>;
  if (!data?.tree) return null;

  const sortedTreeByPathAndType = data.tree.sort(
    (a, b) => {
      if (!a.path || !b.path || !a.type || !b.type) return 0;
      return a.path.localeCompare(b.path) && b.type.localeCompare(a.type);
    },
  );

  return (
    <div className="pl-3">
      {path !== 'root' && (
      <div className="flex gap-x-3">
        <button
          type="button"
          className="rounded-full bg-primary p-1"
          onClick={() => setIsFold(!isFold)}
        >
          {isFold ? '+' : '-'}
        </button>
        <p className="text-text-primary">
          {path}
        </p>
      </div>
      )}
      {!isFold && sortedTreeByPathAndType.map((item) => {
        if (!item.sha) return null;
        if (item.type === 'blob') {
          return (
            <div key={item.sha} className="flex gap-x-3 pl-3">
              <div className="rounded-full bg-primary p-1">
                =
              </div>
              <p className="text-text-primary">
                {item.path}
              </p>
            </div>
          );
        }
        return (
          <div key={item.sha} className="">
            <SideBarExplorerItem sha={item.sha} path={item.path} />
          </div>
        );
      })}
    </div>
  );
}

export default SideBarExplorerItem;
