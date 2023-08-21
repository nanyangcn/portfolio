'use client';

import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Tab } from 'hooks/useTabStore';
import useActivityBarStore from 'hooks/useActivityBarStore';

import CodeChecker from 'components/CodeChecker';

const queryClient = new QueryClient();

interface PageProps {
  tab: Tab
}

function PageText({ tab }: PageProps) {
  const { setActivityBarState } = useActivityBarStore();
  useEffect(() => {
    setActivityBarState('explorer');
  }, [setActivityBarState]);

  if (!tab.sha) throw new Error('No tab sha provided!');

  return (
    <QueryClientProvider client={queryClient}>
      <div className="">
        <CodeChecker sha={tab.sha} />
      </div>
    </QueryClientProvider>
  );
}

export default PageText;
