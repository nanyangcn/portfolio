'use client';

import { useState } from 'react';
import {
  VscFiles, VscSearch, VscExtensions, VscAccount,
} from 'react-icons/vsc';
import { twMerge } from 'tailwind-merge';

import ButtonHoverTitle from './ButtonHoverTitle';
import SideBar from './SideBar';

function ActivityBar() {
  const [activityBarState, setActivityBarState] = useState<string | null>('home');

  const activityList = [
    {
      title: 'Home',
      icon: VscAccount,
      onClick: () => {
        if (activityBarState === 'home') {
          return setActivityBarState(null);
        }
        return setActivityBarState('home');
      },
    },
    {
      title: 'Explorer',
      icon: VscFiles,
      onClick: () => {
        if (activityBarState === 'explorer') {
          return setActivityBarState(null);
        }
        return setActivityBarState('explorer');
      },
    },
    {
      title: 'Search',
      icon: VscSearch,
      onClick: () => {
        if (activityBarState === 'search') {
          return setActivityBarState(null);
        }
        return setActivityBarState('search');
      },
    },
    {
      title: 'Works',
      icon: VscExtensions,
      onClick: () => {
        if (activityBarState === 'works') {
          return setActivityBarState(null);
        }
        return setActivityBarState('works');
      },
    },
  ];

  return (
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
      <SideBar activityBarState={activityBarState} />
    </div>
  );
}

export default ActivityBar;
