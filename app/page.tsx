'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import useTabStore from 'hooks/useTabStore';

import PageHome from 'components/PageHome';
import PageText from 'components/PageText';
import PageWork from 'components/PageWork';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function Home() {
  const { tabs } = useTabStore();
  const activeTab = tabs.find((tab) => tab.isActive);

  if (!activeTab) throw new Error('No active tab');

  const Page = {
    home: <PageHome />,
    work: <PageWork />,
    text: <PageText tab={activeTab} />,
  };

  return (
    <div className="relative h-full w-full pt-12">
      <QueryClientProvider client={queryClient}>
        {Page[activeTab.meta.type]}
      </QueryClientProvider>
    </div>
  );
}

export default Home;
