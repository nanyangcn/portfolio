'use client';

import { useQuery } from '@tanstack/react-query';

import { Tab } from 'hooks/useTabStore';
import useCurrentRepoStore from 'hooks/useCurrentRepoStore';
import useRateLimit from 'hooks/useRateLimit';

import getRepoBlob from 'services/repoBlob';
import ErrorComp from 'app/error';
import Loading from 'app/loading';
import CodeChecker from './CodeChecker';
import PathBar from './PathBar';

interface PageProps {
  tab: Tab
}

function PageText({ tab }: PageProps) {
  if (tab.meta.type !== 'text' || !tab.meta.sha || !tab.meta.path) throw new Error('Tab Error');
  const { sha } = tab.meta;

  const { ownerState, repoState } = useCurrentRepoStore();
  const { rateLimitState } = useRateLimit();

  const { isLoading, data } = useQuery({
    queryKey: ['repository-blob', ownerState, repoState, sha],
    queryFn: () => getRepoBlob(ownerState, repoState, sha),
    keepPreviousData: true,
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
