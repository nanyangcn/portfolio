import { useEffect, useState } from 'react';

const useProfileScroll = (sectionIdList: (string | undefined)[], scrollContentId: string) => {
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);

  useEffect(() => {
    const scrollContent = document.getElementById(scrollContentId);
    const handleScroll = () => {
      const sections = sectionIdList.map((id) => (id ? document.getElementById(id) : null));
      let currentSection = '';
      sections.forEach((section) => {
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          if (scrollContent?.scrollTop && scrollContent.scrollTop >= sectionTop - sectionHeight / 2) {
            currentSection = section.id;
          }
        }
      });
      const index = sectionIdList.indexOf(currentSection);
      if (index !== -1) {
        setActiveSectionIndex(index);
      }
    };

    scrollContent?.addEventListener('scroll', handleScroll);

    return () => {
      scrollContent?.removeEventListener('scroll', handleScroll);
    };
  }, [sectionIdList, scrollContentId]);

  return { activeSectionIndex, setActiveSectionIndex };
};

export default useProfileScroll;
