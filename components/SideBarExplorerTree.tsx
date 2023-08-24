import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import Loading from 'app/loading';
import Error from 'app/error';
import getRepoTree from 'services/repoTree';
import { twMerge } from 'tailwind-merge';

import useCurrentRepoStore from 'hooks/useCurrentRepoStore';
import SideBarExplorerTreeNode from './SideBarExplorerTreeNode';

interface SideBarExplorerTreeProps {
  sha: string
  queryIter: number
  path?: string
  directory?: string
  depth?: number
  parentIsFold?: boolean
}
function SideBarExplorerTree({
  sha,
  queryIter,
  path = '',
  directory = '',
  depth = 0,
  parentIsFold = false,
}: SideBarExplorerTreeProps) {
  const { ownerState, repoState } = useCurrentRepoStore();
  const [isFold, setIsFold] = useState(depth !== 0);

  const { isLoading, data } = useQuery({
    queryKey: ['repository-tree', ownerState, repoState, sha, queryIter],
    queryFn: () => getRepoTree(ownerState, repoState, sha),
  });

  if (depth === 0) {
    if (isLoading) { return <Loading className="items-start p-4" />; }
    if (!data) return <Error className="items-start p-4" message="No Data" />;
  }

  if (!isLoading && !data?.tree) return null;

  const sortedTreeByPathAndType = data?.tree.sort(
    (a, b) => {
      if (!a.path || !b.path || !a.type || !b.type) return 0;
      return a.path.localeCompare(b.path) && b.type.localeCompare(a.type);
    },
  );

  return (
    <div
      className={twMerge(
        'pl-3 group-hover:border-border-primary border-transparent transition-colors',
        depth > 1 && 'border-l-[1px]',
        parentIsFold ? 'hidden' : 'visible',
      )}
    >
      {path !== '' && (
        <SideBarExplorerTreeNode
          className=""
          sha={sha}
          depth={depth}
          type="tree"
          path={path}
          directory={directory}
          setIsFold={setIsFold}
          isFold={isFold}
          isLoading={isLoading}
        />

      )}
      {sortedTreeByPathAndType?.map((item) => {
        if (!item.sha || !item.path) return null;
        if (item.type === 'blob') {
          return (
            <SideBarExplorerTreeNode
              className={isFold ? 'hidden' : 'visible'}
              key={item.sha}
              sha={item.sha}
              depth={depth}
              type="blob"
              path={item.path}
              directory={directory}
              setIsFold={setIsFold}
              isFold={isFold}
              isLoading={isLoading}
            />
          );
        }
        return (
          <SideBarExplorerTree
            key={item.sha}
            sha={item.sha}
            queryIter={queryIter}
            path={item.path}
            directory={`${directory}/${item.path}`}
            depth={depth + 1}
            parentIsFold={isFold}
          />
        );
      })}
    </div>
  );
}

export default SideBarExplorerTree;
