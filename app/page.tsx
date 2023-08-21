'use client';

import useTabStore from 'hooks/useTabStore';

import PageHome from 'components/PageHome';
import PageText from 'components/PageText';
import PageWork from 'components/PageWork';

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
      {Page[activeTab.type]}
    </div>
  );
}

export default Home;
