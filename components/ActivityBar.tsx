'use client';

import {
  VscFiles, VscSearch, VscExtensions, VscAccount,
} from 'react-icons/vsc';
import { twMerge } from 'tailwind-merge';

import useActivityBarStore from 'hooks/useActivityBarStore';

import { useMemo } from 'react';

import ButtonHoverTitle from './ButtonHoverTitle';

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

  return (
    <div
      id="activity-bar"
      className="flex flex-col items-center border-r-[1px] border-border-primary"
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
            <div className="peer p-4">
              <item.icon size={32} />
            </div>
            <ButtonHoverTitle
              className="peer-hover:visible peer-hover:opacity-100"
              title={item.title}
            />
          </button>
        );
      })}
    </div>
  );
}

export default ActivityBar;
