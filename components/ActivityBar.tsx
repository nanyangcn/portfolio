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
      onClick: () => setActivityBarState(activityBarState === 'home' ? null : 'home'),
    },
    {
      title: 'Works',
      icon: VscExtensions,
      onClick: () => setActivityBarState(activityBarState === 'works' ? null : 'works'),
    },
    {
      title: 'Explorer',
      icon: VscFiles,
      onClick: () => setActivityBarState(activityBarState === 'explorer' ? null : 'explorer'),
    },
    {
      title: 'Search',
      icon: VscSearch,
      onClick: () => setActivityBarState(activityBarState === 'search' ? null : 'search'),
    },
  ], [activityBarState, setActivityBarState]);

  const sideBarComponentMap = useMemo(() => ({
    home: <SideBarHome />,
    works: <SideBarWorks />,
    explorer: <SideBarExplorer />,
    search: <SideBarSearch />,
  }), []);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex">
        <div className="flex flex-col items-center border-r-[1px] border-neutral-700/50">
          {activityList.map((item) => {
            const active = activityBarState === item.title.toLowerCase();
            const textColor = `${active ? 'text-neutral-300' : 'text-neutral-500'}`;
            const indicator = `${active ? 'border-[#0078D4]' : 'border-transparent'}`;
            return (
              <button
                type="button"
                className={twMerge(
                  'relative flex items-center cursor-pointer border-l-[3px] text-neutral-500 hover:text-neutral-300',
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
        {activityBarState
          ? (
            <SideBar>
              {sideBarComponentMap[activityBarState]}
            </SideBar>
          )
          : null}
      </div>
    </QueryClientProvider>
  );
}

export default ActivityBar;
