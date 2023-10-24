'use client';

import { useMemo } from 'react';

import useTabStore from 'hooks/useTabStore';

import PageProfile from 'components/page/profile/PageProfile';
import PageText from 'components/page/text/PageText';
import PageWork from 'components/page/work/PageWork';

function Home() {
  const { tabs } = useTabStore();

  const activeTab = tabs.find((tab) => tab.isActive);

  if (!activeTab) throw new Error('No active tab');

  const Page = useMemo(() => ({
    // profile: <PageProfile key="profile" />,
    work: <PageWork key={activeTab.title} tab={activeTab} />,
    text: <PageText key={activeTab.title} tab={activeTab} />,
  }), [activeTab]);

  return (
    <div className="min-h-0 grow bg-additional">
      <PageProfile className={`${activeTab.meta.type === 'profile' ? '' : 'hidden'}`} />
      {activeTab.meta.type !== 'profile' && Page[activeTab.meta.type]}
    </div>
  );
}

export default Home;
