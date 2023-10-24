import useActivityBarStore from 'hooks/useActivityBarStore';
import useTabStore, { Tab } from 'hooks/useTabStore';
import useCurrentRepoStore from 'hooks/useCurrentRepoStore';

import Header from 'components/page/profile/Header';
import MainContent from 'components/page/profile/MainContent';
import SubColumn from 'components/page/profile/SubColumn';
import PageWorkContent from './PageWorkContent';

interface PageWorkProps {
  tab: Tab
}

function PageWork({ tab }: PageWorkProps) {
  const { setActivityBarState } = useActivityBarStore();
  const { clearTextTabs } = useTabStore();
  const {
    ownerState, repoState, setOwnerState, setRepoState,
  } = useCurrentRepoStore();
  if (tab.meta.type !== 'work') throw new Error('Tab Error');
  const { workMeta } = tab.meta;

  const handleCheckCode = () => {
    setActivityBarState('explorer');
    if (ownerState === workMeta.subtitle && repoState === workMeta.title) return;
    clearTextTabs();
    setOwnerState(workMeta.subtitle.toLowerCase());
    setRepoState(workMeta.title.toLowerCase());
  };

  return (
    <div className="flex h-full w-full flex-col divide-y-2 divide-solid divide-border-primary">
      <Header workMeta={workMeta}>
        <button
          type="button"
          className="rounded-sm bg-primary px-2 py-1 font-bold text-text-primary"
          onClick={handleCheckCode}
        >
          Click to Check the Code - !RIGHT HERE!
        </button>
      </Header>
      <div className="mx-20 flex min-h-0 grow gap-x-6 text-text-primary">
        <MainContent page="work">
          <PageWorkContent workMeta={workMeta} />
        </MainContent>
        <SubColumn workMeta={workMeta} />
      </div>
    </div>
  );
}

export default PageWork;
