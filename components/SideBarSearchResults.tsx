import React from 'react';
import { useQuery } from '@tanstack/react-query';

import useCurrentRepoStore from 'hooks/useCurrentRepoStore';
import getSearchCode from 'services/searchCode';
import Loading from 'app/loading';
import ErrorComp from 'app/error';
import FileIcon from './FileIcon';

interface SideBarSearchResultsProps {
  keyword: string;
}

function SideBarSearchResults({ keyword }: SideBarSearchResultsProps) {
  const { ownerState, repoState } = useCurrentRepoStore();
  const repo = `${ownerState}/${repoState}`;
  const { isLoading, data } = useQuery({
    queryKey: ['search-code', keyword, repo],
    queryFn: () => getSearchCode(keyword, repo),
  });

  if (isLoading) return <Loading />;
  if (!data) return <ErrorComp message="No data response on search" />;

  if (data.total_count === 0) {
    return (
      <div>No Result Found.</div>
    );
  }

  return (
    <div>
      <div className="pb-2 text-text-secondary">
        {`${data.total_count} files`}
      </div>
      <div className="scroll flex flex-col gap-y-1 overflow-y-auto">
        {data.items.map((item) => (
          <div key={item.sha} className="flex items-center gap-x-2">
            <FileIcon path={item.name} size={20} />
            <span className="truncate" title={item.path}>
              {item.name}
              <span className="truncate pl-2 text-sm text-text-secondary">
                {item.path.split('/').slice(0, -1).join('/')}
              </span>
            </span>

          </div>
        ))}
      </div>
    </div>
  );
}

export default SideBarSearchResults;
