'use client';

import Image from 'next/image';

import useTabStore from 'hooks/useTabStore';
import { VscClose } from 'react-icons/vsc';
import { twMerge } from 'tailwind-merge';
import { useEffect } from 'react';

function TabsBar() {
  const { tabs, setActiveTab, removeTab } = useTabStore();

  useEffect(() => {
    const tabElement = document.querySelector<HTMLDivElement>('.scroll-tab');
    if (!tabElement) return () => {};
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 0) tabElement.scrollLeft += 100;
      else tabElement.scrollLeft -= 100;
    };
    tabElement.addEventListener('wheel', handleWheel);
    return () => {
      tabElement.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <div
      className="scroll-tab flex h-12 w-full flex-none overflow-x-auto overflow-y-hidden
    border-border-primary bg-secondary"
    >
      {tabs.map((tab, index) => {
        let key = 'home';
        if (tab.meta.type === 'text') key = tab.meta.sha;
        if (tab.meta.type === 'work') key = tab.meta.workMeta.title;
        return (
          <div
            key={key}
            className={twMerge(
              'group flex h-full border-r-2 border-t-2 border-border-primary',
              'border-t-transparent pr-2 hover:cursor-pointer hover:bg-additional',
              tab.isActive ? 'bg-additional border-t-primary' : 'border-b-2',
            )}
          >
            <div
              role="button"
              tabIndex={0}
              className="flex h-full items-center justify-center gap-x-2"
              onClick={() => setActiveTab(index)}
              onKeyDown={() => setActiveTab(index)}
            >
              {typeof tab.icon === 'string' ? (
                <Image
                  className="ml-4"
                  src={tab.icon}
                  alt={tab.title}
                  width={20}
                  height={20}
                />
              ) : (
                <div className="ml-4">
                  {tab.icon}
                </div>
              )}
              <p className={twMerge(
                'mr-4 text-text-secondary',
                tab.isActive && 'text-text-primary',
              )}
              >
                {tab.title}
              </p>
            </div>
            {tab.meta.type !== 'home' ? (
              <button
                type="button"
                className={twMerge(
                  'rounded-md p-0.5 invisible text-text-secondary group-hover:visible hover:bg-border-primary',
                  tab.isActive && 'visible text-text-primary',
                )}
                onClick={() => removeTab(index)}
              >
                <VscClose size={20} />
              </button>
            ) : null}
          </div>
        );
      })}
      <div className="grow border-b-2 border-border-primary bg-secondary" />
    </div>
  );
}

export default TabsBar;
