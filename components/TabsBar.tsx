'use client';

import Image from 'next/image';
import { VscClose } from 'react-icons/vsc';
import { twMerge } from 'tailwind-merge';
import { useEffect } from 'react';

import DragProvider from 'providers/DragProvider';

import useTabStore from 'hooks/useTabStore';

function TabsBar() {
  const {
    tabs, setActiveTab, removeTab, swapTabs,
  } = useTabStore();

  useEffect(() => {
    const tabsElement = document.getElementById('tabs');
    if (!tabsElement) return () => {};
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 0) tabsElement.scrollLeft += 100;
      else tabsElement.scrollLeft -= 100;
    };
    tabsElement.addEventListener('wheel', handleWheel);
    return () => {
      tabsElement.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <DragProvider list={tabs} swapItems={swapTabs} draggableId="draggable-tab">
      <div
        id="tabs"
        className="scroll flex h-12 w-full flex-none
        overflow-x-auto overflow-y-hidden border-border-primary bg-secondary
      [&::-webkit-scrollbar-track]:bg-additional [&::-webkit-scrollbar]:h-1"
      >
        {tabs.map((tab, index) => {
          const key = `tab-${tab.meta.type}-${index}`;
          return (
            <div
              id={`draggable-tab-${index}`}
              key={key}
              className={twMerge(
                'group flex flex-none items-center h-full border-r-2 border-t-2 border-border-primary',
                'border-t-transparent pr-2 hover:cursor-pointer hover:bg-additional',
                tab.isActive ? 'bg-additional border-t-primary' : 'border-b-2',
                'draggable-tab-drop-zone',
              )}
              draggable="true"
              onClick={() => setActiveTab(index)}
              onKeyDown={() => setActiveTab(index)}
              role="button"
              tabIndex={0}
            >
              <div
                className="pointer-events-none flex items-baseline justify-center gap-x-2 px-4"
              >
                <div className="translate-y-1">
                  {typeof tab.icon === 'string' ? (
                    <Image
                      src={tab.icon}
                      alt={tab.title}
                      width={20}
                      height={20}
                    />
                  ) : (
                    tab.icon
                  )}
                </div>
                <p className={twMerge(
                  'text-text-secondary',
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
    </DragProvider>
  );
}

export default TabsBar;
