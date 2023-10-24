import { useEffect, useState } from 'react';
import { VscArrowCircleUp, VscGear } from 'react-icons/vsc';

import useProfileScroll from 'hooks/useProfileScroll';
import { sectionIdList } from 'components/sidebar/profile/SideBarProfile';
import AttachButton from 'components/AttachButton';
import { twMerge } from 'tailwind-merge';

interface ScrollButtonProps {
  page: 'profile' | 'work';
}

function ScrollButton({ page }: ScrollButtonProps) {
  const [isShowScrollToTop, setIsShowScrollToTop] = useState(false);
  const { activeSectionIndex, sectionsPercentage } = useProfileScroll(sectionIdList, 'profile-content');

  useEffect(() => {
    if (!('contact' in sectionsPercentage && typeof sectionsPercentage.contact === 'number')) return;
    if (sectionsPercentage.contact < 0.8) setIsShowScrollToTop(false);
    else setIsShowScrollToTop(true);
  }, [activeSectionIndex, sectionsPercentage]);

  const handleToTop = () => {
    const element = document.getElementById('profile-content');
    if (!element) return;
    element.scrollTo({
      top: 0,
    });
  };

  let style: React.CSSProperties = {};
  if ('home' in sectionsPercentage
    && typeof sectionsPercentage.home === 'number') {
    const aboutPercentage = sectionsPercentage.home;
    style = {
      transform: `rotate(${aboutPercentage * 180}deg)`,
      ...style,
    };
  }

  if (page === 'work') {
    return null;
  }

  return (
    <div className="absolute bottom-24 right-4 opacity-20 hover:cursor-pointer hover:opacity-70">
      <AttachButton title="scroll-gear">
        <VscGear size={56} style={style} className={twMerge('transition-all', isShowScrollToTop ? 'hidden' : '')} />
      </AttachButton>
      <AttachButton title="to-top" className={`${isShowScrollToTop ? '' : 'hidden'}`} onClick={handleToTop}>
        <VscArrowCircleUp size={56} className="" />
      </AttachButton>
    </div>
  );
}

export default ScrollButton;
