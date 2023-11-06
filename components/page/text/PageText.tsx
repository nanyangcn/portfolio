'use client';

import { useQuery, keepPreviousData } from '@tanstack/react-query';

import { Tab } from 'hooks/useTabStore';
import useCurrentRepoStore from 'hooks/useCurrentRepoStore';
import useRateLimitStore from 'hooks/useRateLimitStore';

import getRepoBlob from 'services/repoBlob';
import ErrorComp from 'app/error';
import Loading from 'app/loading';
import CodeChecker from '../../CodeChecker';
import PathBar from '../../PathBar';

interface PageProps {
  tab: Tab
}

function PageText({ tab }: PageProps) {
  if (tab.meta.type !== 'text' || !tab.meta.sha || !tab.meta.path) throw new Error('Tab Error');
  const { sha } = tab.meta;

  const { ownerState, repoState } = useCurrentRepoStore();
  const { rateLimitState, updateRateLimitState } = useRateLimitStore();

  const { isLoading, data } = useQuery({
    queryKey: ['repository-blob', ownerState, repoState, sha],
    queryFn: async () => {
      const RepoBlobRes = await getRepoBlob(ownerState, repoState, sha);
      await updateRateLimitState();
      return RepoBlobRes;
    },
    placeholderData: keepPreviousData,
  });

  if (isLoading) return <Loading />;
  if (!data) {
    if (rateLimitState.rate.remaining === 0) {
      return <ErrorComp message={`Rate Limit: Please try after ${rateLimitState.rate.reset}`} />;
    }
    return <ErrorComp message="No Data" />;
  }

  return (
    <div className="flex h-full w-full flex-col">
      <PathBar path={tab.meta.path} />
      <CodeChecker encodedText={data.content} />
    </div>
  );
}

export default PageText;
