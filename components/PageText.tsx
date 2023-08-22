'use client';

import { useQuery } from '@tanstack/react-query';

import { Tab } from 'hooks/useTabStore';
import useCurrentRepoStore from 'hooks/useCurrentRepoStore';

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
  const { isLoading, data } = useQuery({
    queryKey: ['repository-blob', ownerState, repoState, sha],
    queryFn: () => getRepoBlob(ownerState, repoState, sha),
  });

  if (isLoading) return <Loading />;
  if (!data) return <ErrorComp message="No Data" />;

  return (
    <div className="relative h-full w-full">
      <PathBar path={tab.meta.path} />
      <CodeChecker encodedText={data.content} />
    </div>
  );
}

export default PageText;
