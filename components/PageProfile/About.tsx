import React from 'react';

import useProfileScroll from 'hooks/useProfileScroll';
import { sectionIdList } from 'components/SideBarProfile';
import { twMerge } from 'tailwind-merge';

function About() {
  const { sectionsPercentage } = useProfileScroll(sectionIdList, 'profile-content');

  const list = [1, 2, 3, 4, 5];
  let styleList = new Array(list.length).fill({}) as React.CSSProperties[];
  if ('about' in sectionsPercentage) {
    const aboutPercentage = sectionsPercentage.about as number;

    const scrollContent = document.getElementById('profile-content');
    const halfWidth = (scrollContent?.getBoundingClientRect().width ?? 0) / 2;
    styleList = styleList.map((item, index) => {
      const maxPercentage = 0.8 - ((0.8 - 0.2) / 4) * index;
      const translateRatio = (aboutPercentage - index / list.length) / maxPercentage - 1;
      const opacityRatio = (aboutPercentage - index / list.length) / maxPercentage;
      const limitedTranslateRatio = translateRatio > 0 ? 0 : translateRatio;
      return ({
        ...item,
        opacity: opacityRatio,
        transform: `translateX(${halfWidth * (index % 2 === 0 ? 1 : -1) * limitedTranslateRatio}px)`,
      });
    });
  }

  return (
    <div className="relative flex h-fit snap-center flex-col py-8" id="about">
      <h2 className="text-3xl">My Timeline</h2>
      <div className="absolute inset-y-10 left-1/2 w-1 rounded-full bg-text-primary" />
      {list.map((item, index) => (
        <div
          style={styleList[index]}
          key={item}
          className={twMerge(
            'h-[200px] w-1/2 flex justify-center items-center',
            index % 2 === 0 ? '' : 'self-end',
          )}
        >
          {item}
        </div>
      ))}
    </div>
  );
}

export default About;
