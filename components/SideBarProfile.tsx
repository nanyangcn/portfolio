import useProfileScroll from 'hooks/useProfileScroll';
import { twMerge } from 'tailwind-merge';

export const NavList = [
  ['#home', '🛖', 'Home'],
  ['#about', '🗿', 'About'],
  ['#services', '🦾', 'Services'],
  ['#work', '🗂', 'Work'],
  ['#contact', '✉️', 'Contact'],
];
export const sectionIdList = NavList.map((item) => item[2]?.toLowerCase());

function SideBarProfile() {
  const { activeSectionIndex } = useProfileScroll(sectionIdList, 'profile-content');

  return (
    <div className="flex flex-col text-text-primary">
      <div className="flex h-12 items-center truncate px-8 text-lg font-bold">
        Profile
      </div>
      <div className="relative">
        <div
          className="absolute inset-x-0 top-0 h-16 rounded-lg bg-border-primary transition-all"
          style={{
            transform: `translateY(${activeSectionIndex * 64}px)`,
          }}
        />
        <div className="absolute inset-x-0 top-0 flex flex-col">
          {NavList.map(([link, icon, title], index) => (
            <a key={link} href={link}>
              <div
                className={twMerge(
                  'flex h-16 items-center gap-x-4 px-4 text-xl',
                  activeSectionIndex === index ? '' : 'hover:bg-border-secondary',
                )}
              >
                {icon}
                <p>{title}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SideBarProfile;
