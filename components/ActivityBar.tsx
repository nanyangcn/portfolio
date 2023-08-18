'use client';

import {
  VscFiles, VscSearch, VscExtensions, VscAccount,
} from 'react-icons/vsc';
import { twMerge } from 'tailwind-merge';

import useActivityBarStore from 'hooks/useActivityBarStore';

import { useMemo } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import ButtonHoverTitle from './ButtonHoverTitle';
import SideBar from './SideBar';
import SideBarHome from './SideBarHome';
import SideBarWorks from './SideBarWorks';
import SideBarSearch from './SideBarSearch';
import SideBarExplorer from './SideBarExplorer';

const queryClient = new QueryClient();

function ActivityBar() {
  const { activityBarState, setActivityBarState } = useActivityBarStore();

  const activityList = useMemo(() => [
    {
      title: 'Home',
      icon: VscAccount,
      onClick: () => setActivityBarState(activityBarState === 'home' ? 'hide' : 'home'),
    },
    {
      title: 'Works',
      icon: VscExtensions,
      onClick: () => setActivityBarState(activityBarState === 'works' ? 'hide' : 'works'),
    },
    {
      title: 'Explorer',
      icon: VscFiles,
      onClick: () => setActivityBarState(activityBarState === 'explorer' ? 'hide' : 'explorer'),
    },
    {
      title: 'Search',
      icon: VscSearch,
      onClick: () => setActivityBarState(activityBarState === 'search' ? 'hide' : 'search'),
    },
  ], [activityBarState, setActivityBarState]);

  const sideBarComponentMap = useMemo(() => ({
    home: <SideBarHome />,
    works: <SideBarWorks />,
    explorer: <SideBarExplorer />,
    search: <SideBarSearch />,
    hide: null,
  }), []);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex">
        <div
          id="activity-bar"
          className={twMerge(
            'flex flex-col items-center border-r-[1px] border-border-primary',
            activityBarState === 'hide' && 'border-r-0',
          )}
        >
          {activityList.map((item) => {
            const active = activityBarState === item.title.toLowerCase();
            const textColor = `${active ? 'text-text-primary' : 'text-text-secondary'}`;
            const indicator = `${active ? 'border-primary' : 'border-transparent'}`;
            return (
              <button
                type="button"
                className={twMerge(
                  `relative flex items-center cursor-pointer border-l-[3px]
                  text-text-secondary hover:text-text-primary`,
                  textColor,
                  indicator,
                )}
                data-title={item.title}
                key={item.title}
                onClick={item.onClick}
              >
                <div className="icon p-4">
                  <item.icon size={32} />
                </div>
                <ButtonHoverTitle
                  className="title-on-icon"
                  title={item.title}
                />
              </button>
            );
          })}
        </div>
        <SideBar>
          {sideBarComponentMap[activityBarState]}
        </SideBar>
      </div>
    </QueryClientProvider>
  );
}

export default ActivityBar;
