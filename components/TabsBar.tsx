'use client';

import Image from 'next/image';

import useTabStore from 'hooks/useTabStore';
import { VscClose } from 'react-icons/vsc';
import { twMerge } from 'tailwind-merge';

function TabsBar() {
  const { tabs, setActiveTab, removeTab } = useTabStore();
  return (
    <div className="absolute top-0 z-20 h-12 w-full border-b-[1px] border-border-primary bg-secondary">
      <div className="flex">
        {tabs.map((tab, index) => (
          <div
            key={`${tab.title}${tab.sha}-${Math.floor(Math.random() * 128)}`}
            className={twMerge(
              'h-[48px] border-t-2 border-t-transparent',
              tab.isActive && 'bg-additional border-t-primary',
            )}
          >
            <div className="group flex h-[46px] items-center border-r-2 border-t-2 border-border-primary
            border-t-transparent pr-2 hover:cursor-pointer hover:bg-additional"
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
              {tab.type !== 'home' ? (
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
          </div>
        ))}
      </div>
    </div>
  );
}

export default TabsBar;
