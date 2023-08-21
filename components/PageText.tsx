'use client';

import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Tab } from 'hooks/useTabStore';
import useActivityBarStore from 'hooks/useActivityBarStore';

import CodeChecker from './CodeChecker';
import PathBar from './PathBar';

const queryClient = new QueryClient();

interface PageProps {
  tab: Tab
}

function PageText({ tab }: PageProps) {
  const { setActivityBarState } = useActivityBarStore();
  useEffect(() => {
    setActivityBarState('explorer');
  }, [setActivityBarState]);

  if (!tab.sha || !tab.path) throw new Error('Tab Error');

  return (
    <QueryClientProvider client={queryClient}>
      <div className="relative h-full w-full">
        <PathBar path={tab.path} />
        <CodeChecker sha={tab.sha} />
      </div>
    </QueryClientProvider>
  );
}

export default PageText;
