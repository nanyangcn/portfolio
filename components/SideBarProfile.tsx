import {
  VscGift, VscHome, VscLibrary, VscMortarBoard, VscSend,
} from 'react-icons/vsc';
import { twMerge } from 'tailwind-merge';

import useProfileScroll from 'hooks/useProfileScroll';

export const NavList = [
  { href: '#home', icon: VscHome, title: 'Home' },
  { href: '#about', icon: VscMortarBoard, title: 'About' },
  { href: '#services', icon: VscGift, title: 'Services' },
  { href: '#work', icon: VscLibrary, title: 'Work' },
  { href: '#contact', icon: VscSend, title: 'Contact' },
];
export const sectionIdList = NavList.map((item) => item.title.toLowerCase());

function SideBarProfile() {
  const { activeSectionIndex } = useProfileScroll(sectionIdList, 'profile-content');

  return (
    <div className="flex flex-col text-text-primary">
      <div className="flex h-12 items-center truncate px-8 text-lg font-bold">
        Profile
      </div>
      <div className="relative">
        <div
          className="absolute inset-x-0 top-0 h-16 bg-border-primary transition-all"
          style={{
            transform: `translateY(${activeSectionIndex * 64}px)`,
          }}
        />
        <div className="absolute inset-x-0 top-0 flex flex-col">
          {NavList.map((item, index) => (
            <a key={item.href} href={item.href}>
              <div
                className={twMerge(
                  'flex h-16 items-center gap-x-4 px-6 text-xl',
                  activeSectionIndex === index ? '' : 'hover:bg-border-secondary',
                )}
              >
                <item.icon size={40} className="shrink-0" />
                <p>{item.title}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SideBarProfile;
