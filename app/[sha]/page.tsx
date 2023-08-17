'use client';

import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CodeChecker from 'components/CodeChecker';
import useActivityBarStore from 'hooks/useActivityBarStore';

const queryClient = new QueryClient();

interface PageProps {
  params: { sha: string }
}

function Page({ params }: PageProps) {
  const { setActivityBarState } = useActivityBarStore();
  useEffect(() => {
    setActivityBarState('explorer');
  }, [setActivityBarState]);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="">
        <CodeChecker sha={params.sha} />
      </div>
    </QueryClientProvider>
  );
}

export default Page;
