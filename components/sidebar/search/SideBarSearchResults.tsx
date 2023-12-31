import React from 'react';
import { useQuery } from '@tanstack/react-query';

import useCurrentRepoStore from 'hooks/useCurrentRepoStore';
import useSearchStore from 'hooks/useSearchStore';

import getSearchCode from 'services/searchCode';
import Loading from 'app/loading';
import ErrorComp from 'app/error';
import useRateLimitStore from 'hooks/useRateLimitStore';

import SideBarSearchResultsItem from './SideBarSearchResultsItem';

interface SideBarSearchResultsProps {
  queryIter: number;
  isFoldAll: boolean;
}

function SideBarSearchResults({ queryIter, isFoldAll }: SideBarSearchResultsProps) {
  const { ownerState, repoState } = useCurrentRepoStore();
  const { rateLimitState, updateRateLimitState } = useRateLimitStore();
  const { keywordState } = useSearchStore();

  const repo = `${ownerState}/${repoState}`;
  const { isLoading, data } = useQuery({
    queryKey: ['search-code', keywordState, repo, queryIter],
    queryFn: async () => {
      const searchResults = await getSearchCode(keywordState, repo);
      await updateRateLimitState();
      return searchResults;
    },
  });

  if (isLoading) return <Loading />;
  if (!data) {
    if (rateLimitState.codeSearch.remaining === 0 && rateLimitState.codeSearch.reset !== null) {
      return <ErrorComp message={`Rate Limit: Please try after ${rateLimitState.codeSearch.reset}`} />;
    }
    return <ErrorComp message="No data" />;
  }

  if (data.total_count === 0) {
    return (
      <div className="flex items-center justify-center py-4 text-2xl">No Result Found.</div>
    );
  }

  const resultsCountsInEachItem = data.items.map((item) => (
    item.text_matches
      ? item.text_matches.reduce((acc, match) => (
        acc + (!match.matches ? 0 : match.matches.length)
      ), 0)
      : 0
  ));

  const totalResultsCount = resultsCountsInEachItem.reduce((acc, count) => acc + count, 0);

  return (
    <div className="flex min-h-0 grow flex-col pl-4 text-text-primary">
      <div className="py-2 text-text-secondary">
        {`${totalResultsCount} results in ${data.total_count} files`}
      </div>
      <div className="scroll flex min-h-0 flex-col gap-y-1 overflow-y-scroll [&::-webkit-scrollbar]:w-3">
        {data.items.map((item, index) => (
          <SideBarSearchResultsItem
            key={item.sha}
            item={item}
            count={resultsCountsInEachItem[index] ?? 0}
            isFoldAll={isFoldAll}
          />
        ))}
      </div>
    </div>
  );
}

export default SideBarSearchResults;
