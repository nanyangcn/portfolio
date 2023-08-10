'use client';

import { useState } from 'react';
import {
  VscFiles, VscSearch, VscExtensions, VscAccount,
} from 'react-icons/vsc';
import { twMerge } from 'tailwind-merge';

import ButtonHoverTitle from './ButtonHoverTitle';

function NavBar() {
  const [navBarState, setNavBarState] = useState('home');

  const navList = [
    {
      title: 'Home',
      icon: VscAccount,
      onClick: () => {
        setNavBarState('home');
      },
    },
    {
      title: 'Explorer',
      icon: VscFiles,
      onClick: () => {
        setNavBarState('explorer');
      },
    },
    {
      title: 'Search',
      icon: VscSearch,
      onClick: () => {
        setNavBarState('search');
      },
    },
    {
      title: 'Projects',
      icon: VscExtensions,
      onClick: () => {
        setNavBarState('projects');
      },
    },
  ];
  return (
    <div className="flex flex-col items-center justify-between border-r-[1px] border-neutral-700/50">
      <div className="flex flex-col items-center">
        {navList.map((item) => {
          const active = navBarState === item.title.toLowerCase();
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
    </div>
  );
}

export default NavBar;
