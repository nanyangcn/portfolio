import { useEffect, useState } from 'react';
import { VscArrowCircleUp, VscGear } from 'react-icons/vsc';

import useProfileScroll from 'hooks/useProfileScroll';
import { sectionIdList } from 'components/SideBarProfile';

function ScrollButton() {
  const [isShowScrollToTop, setIsShowScrollToTop] = useState(false);
  const { activeSectionIndex, sectionsPercentage } = useProfileScroll(sectionIdList, 'profile-content');

  useEffect(() => {
    if (activeSectionIndex !== sectionIdList.length - 1) setIsShowScrollToTop(false);
    else setIsShowScrollToTop(true);
  }, [activeSectionIndex]);

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
  return (
    <div className="absolute bottom-24 right-4 flex flex-col opacity-20 hover:cursor-pointer hover:opacity-70">
      <VscGear size={56} style={style} className="" />
      <button
        type="button"
        className={`${isShowScrollToTop ? '' : 'invisible'}`}
        onClick={handleToTop}
      >
        <VscArrowCircleUp size={56} className="" />
      </button>
    </div>
  );
}

export default ScrollButton;
