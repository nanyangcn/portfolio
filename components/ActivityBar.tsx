'use client';

import { useCallback, useMemo } from 'react';
import {
  VscFiles, VscSearch, VscExtensions, VscAccount,
} from 'react-icons/vsc';
import { twMerge } from 'tailwind-merge';
import { useRouter, useSearchParams } from 'next/navigation';

import useActivityBarStore, { Activity } from 'hooks/useActivityBarStore';

import ButtonHoverTitle from './ButtonHoverTitle';

function ActivityBar() {
  // const {
  //   activityBarState, setActivityBarState, isActivityBarOpen, setIsActivityBarOpen,
  // } = useActivityBarStore();

  const searchParams = useSearchParams();
  const router = useRouter();
  const activityBarState = searchParams.get('activity');

  const setState = useCallback((stateName: Activity) => {
    const setActivityBarState = () => {
      const params = new URLSearchParams(searchParams);
      params.set('activity', stateName);
      router.push(`?${params.toString()}`);
    };

    const setIsActivityBarOpen = () => {
      const isActivityBarOpen = searchParams.get('isActivityBarOpen') === 'true';
      const params = new URLSearchParams(searchParams);
      params.set('isActivityBarOpen', String(!isActivityBarOpen));
      router.push(`?${params.toString()}`);
    };
    return (activityBarState === stateName
      ? setIsActivityBarOpen()
      : setActivityBarState());
  }, [searchParams, activityBarState, router]);

  const activityList = useMemo(() => [
    {
      title: 'Profile',
      icon: VscAccount,
      onClick: () => setState('profile'),
    },
    {
      title: 'Works',
      icon: VscExtensions,
      onClick: () => setState('works'),
    },
    {
      title: 'Explorer',
      icon: VscFiles,
      onClick: () => setState('explorer'),
    },
    {
      title: 'Search',
      icon: VscSearch,
      onClick: () => setState('search'),
    },
  ], [setState]);

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
              position="right"
            />
          </button>
        );
      })}
    </div>
  );
}

export default ActivityBar;
