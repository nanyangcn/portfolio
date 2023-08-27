'use client';

import { useMemo } from 'react';

import useTabStore from 'hooks/useTabStore';

import PageHome from 'components/PageHome';
import PageText from 'components/PageText';
import PageWork from 'components/PageWork';

function Home() {
  const { tabs } = useTabStore();

  const activeTab = tabs.find((tab) => tab.isActive);

  if (!activeTab) throw new Error('No active tab');

  const Page = useMemo(() => ({
    home: <PageHome />,
    work: <PageWork tab={activeTab} />,
    text: <PageText tab={activeTab} />,
  }), [activeTab]);

  return (
    <div className="min-h-0 grow bg-additional">
      {Page[activeTab.meta.type]}
    </div>
  );
}

export default Home;
