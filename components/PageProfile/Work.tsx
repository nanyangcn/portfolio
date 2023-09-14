import React, { useEffect, useState } from 'react';
import { FaRegHandPointLeft } from 'react-icons/fa';

import useProfileScroll from 'hooks/useProfileScroll';
import { sectionIdList } from 'components/SideBarProfile';
import useActivityBarStore from 'hooks/useActivityBarStore';
import { VscExtensions } from 'react-icons/vsc';

function Work() {
  const [isMaskVisible, setIsMaskVisible] = useState(false);
  const [isMaskClosed, setIsMaskClosed] = useState(false);

  const { sectionsPercentage } = useProfileScroll(sectionIdList, 'profile-content');
  const { activityBarState } = useActivityBarStore();

  const maskStyle: React.CSSProperties = {
    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 8rem, 4rem 8rem, 4rem 4rem, 0 4rem)',
  };

  const handleCloseMask = () => {
    setIsMaskVisible(false);
    setIsMaskClosed(true);
  };

  useEffect(() => {
    if (
      'work' in sectionsPercentage
      && typeof sectionsPercentage.work === 'number'
      && sectionsPercentage.work > 1
    ) {
      setIsMaskVisible(true);
    }

    if (activityBarState === 'works') {
      handleCloseMask();
    }
  }, [activityBarState, sectionsPercentage]);

  return (
    <div className="flex min-h-[calc((100vh-294px)/2)] snap-center flex-col gap-y-8 py-8" id="work">
      <FaRegHandPointLeft size={72} className="shrink-0 animate-[bounce-horizontal_1s_infinite]" />
      <p className="h-full text-4xl">
        Click
        <span className="inline-flex items-baseline px-4">
          <VscExtensions size={36} className="shrink-0" />
        </span>
        to Check My Works.
      </p>
      {isMaskVisible && !isMaskClosed && (
      <div
        style={maskStyle}
        className="fixed left-0 top-0 z-40 h-screen w-screen bg-black/30 backdrop-blur-md"
      >
        <div className="relative ml-16 mt-16 w-fit rounded-lg border-2 border-border-primary bg-additional py-4">
          <p className="flex items-center gap-x-2 px-4 text-2xl">
            <FaRegHandPointLeft size={36} className="shrink-0 animate-[bounce-horizontal_1s_infinite]" />
            Click Here To Check Works
          </p>
          <div />
        </div>
      </div>
      )}
    </div>
  );
}

export default Work;
