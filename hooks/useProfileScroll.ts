import { useEffect, useState } from 'react';

import throttle from 'libs/throttle';

const useProfileScroll = (sectionIdList: (string | undefined)[], scrollContentId: string) => {
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [sectionsPercentage, setSectionsPercentage] = useState({});

  useEffect(() => {
    const scrollContent = document.getElementById(scrollContentId);
    const handleScroll = () => {
      const sections = sectionIdList.map((id) => (id ? document.getElementById(id) : null));
      let currentSection = '';
      sections.forEach((section) => {
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          if (scrollContent?.scrollTop) {
            const sectionPercentage = (scrollContent.offsetHeight + scrollContent.scrollTop - sectionTop)
              / sectionHeight;
            setSectionsPercentage((prev) => {
              const newState = { ...prev };
              Object.assign(newState, {
                [section.id]: sectionPercentage,
              });
              return newState;
            });
            if (sectionPercentage >= 0.4) {
              currentSection = section.id;
            }
          }
        }
      });
      const index = sectionIdList.indexOf(currentSection);
      if (index !== -1) {
        setActiveSectionIndex(index);
      }
    };

    const throttledHandleScroll = throttle(handleScroll, 100);

    scrollContent?.addEventListener('scroll', throttledHandleScroll);

    return () => {
      scrollContent?.removeEventListener('scroll', throttledHandleScroll);
    };
  }, [sectionIdList, scrollContentId]);

  return {
    activeSectionIndex, setActiveSectionIndex, sectionsPercentage, setSectionsPercentage,
  };
};

export default useProfileScroll;
