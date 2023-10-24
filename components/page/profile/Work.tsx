import React, { useEffect, useState } from 'react';
import { FaRegHandPointLeft } from 'react-icons/fa';

import useProfileScroll from 'hooks/useProfileScroll';
import { sectionIdList } from 'components/sidebar/profile/SideBarProfile';
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
    <div className="flex h-fit snap-center items-center gap-x-8 py-60" id="work">
      <FaRegHandPointLeft size={72} className="shrink-0 animate-[bounce-horizontal_1s_infinite]" />
      <p className="py-16 text-3xl">
        Choose One by Click in the WORKS Sidebar.
      </p>
      {isMaskVisible && !isMaskClosed && (
      <div
        style={maskStyle}
        className="fixed left-0 top-0 z-40 h-screen w-screen bg-black/30 backdrop-blur-md"
      >
        <div className="relative ml-16 mt-16 w-fit rounded-lg border-2 border-border-primary bg-additional py-4">
          <p className="flex items-center gap-x-2 px-4 text-2xl">
            <FaRegHandPointLeft size={36} className="shrink-0 animate-[bounce-horizontal_1s_infinite]" />
            Click
            <span className="inline-flex items-baseline px-1">
              <VscExtensions size={36} className="shrink-0" />
            </span>
            To Check Works
          </p>
          <div />
        </div>
      </div>
      )}
    </div>
  );
}

export default Work;
