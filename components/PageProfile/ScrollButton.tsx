import { useEffect, useState } from 'react';
import { VscArrowCircleDown, VscArrowCircleUp } from 'react-icons/vsc';

import useProfileScroll from 'hooks/useProfileScroll';
import { sectionIdList } from 'components/SideBarProfile';

function ScrollButton() {
  const [isShowScrollDown, setIsShowScrollDown] = useState(true);
  const [isShowScrollToTop, setIsShowScrollToTop] = useState(false);
  const { activeSectionIndex } = useProfileScroll(sectionIdList, 'profile-content');

  useEffect(() => {
    if (activeSectionIndex !== sectionIdList.length - 1) setIsShowScrollToTop(false);
    else setIsShowScrollToTop(true);
    if (activeSectionIndex === sectionIdList.length - 1) setIsShowScrollDown(false);
    else setIsShowScrollDown(true);
  }, [activeSectionIndex]);

  const handleScrollDown = () => {
    const element = document.getElementById('profile-content');
    if (!element) return;
    element.scrollBy({
      top: element.scrollHeight / 5,
    });
  };

  const handleToTop = () => {
    const element = document.getElementById('profile-content');
    if (!element) return;
    element.scrollTo({
      top: 0,
    });
  };

  return (
    <div className="absolute bottom-24 right-4 flex flex-col opacity-20 hover:cursor-pointer hover:opacity-70">
      <button
        type="button"
        className={`${isShowScrollToTop ? '' : 'hidden'}`}
        onClick={handleToTop}
      >
        <VscArrowCircleUp size={56} className="" />
      </button>
      <button
        type="button"
        className={`${isShowScrollDown ? '' : 'hidden'}`}
        onClick={handleScrollDown}
      >
        <VscArrowCircleDown size={56} className="" />
      </button>
    </div>
  );
}

export default ScrollButton;
