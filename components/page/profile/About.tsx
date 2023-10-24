import React, { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import { profileContent } from 'data/profile';
import throttle from 'libs/throttle';
import MotionWhenInteraction from 'components/MotionWhenInteraction';

function Item({
  item, isEven, isXxlScreen, profileContentWidth,
}
: {
  item: typeof profileContent.services[0],
  isEven: boolean,
  isXxlScreen: boolean,
  profileContentWidth: number,
}) {
  return (
    <MotionWhenInteraction
      startStyle={{ transform: 'scaleX(0)', opacity: '0' }}
      endStyle={{ transform: 'scaleX(1)', opacity: '1' }}
      className={twMerge(
        'transition delay-200 duration-700',
        isXxlScreen ? `${isEven ? 'origin-right' : 'origin-left'}` : 'origin-left',
      )}
    >
      <div
        key={item.title}
        className="relative flex items-center rounded-full
        border-4 border-text-primary bg-border-primary p-4"
      >
        <item.icon id={`timeline-icon-${item.title}`} size={40} />
        <p
          id={`timeline-date-${item.title}`}
          className={twMerge(
            'absolute whitespace-nowrap transition',
            isXxlScreen ? `block ${isEven ? 'left-24' : 'right-24'}` : 'hidden',
          )}
        >
          {item.date}
        </p>
        <div
          id={`timeline-text-box-${item.title}`}
          style={{ width: isXxlScreen ? `${profileContentWidth / 3}px` : `${profileContentWidth * (2 / 3)}px` }}
          className={twMerge(
            `absolute flex -top-2 flex-col gap-y-2
            rounded-lg border-2 border-text-secondary p-4 transition`,
            isXxlScreen ? `${isEven ? 'right-24' : 'left-24'}` : 'left-24',
          )}
        >
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <h3 className="text-lg font-bold capitalize">{item.title}</h3>
              <p className="font-semibold">{item.location}</p>
            </div>
            <p
              className={twMerge(
                'whitespace-nowrap',
                isXxlScreen ? 'hidden' : 'block',
              )}
            >
              {item.date}
            </p>
          </div>
          <p className="">{item.description}</p>
        </div>
      </div>
    </MotionWhenInteraction>
  );
}

function About() {
  const [isXxlScreen, setIsXxlScreen] = useState(false);
  const [profileContentWidth, setProfileContentWidth] = useState<number>(300);

  useEffect(() => {
    const profileContentElement = document.getElementById('profile-content');
    if (!profileContentElement) return () => { };

    const setTextBoxStyle = () => {
      const xxlScreenWidth = 1536;
      setIsXxlScreen(window.innerWidth >= xxlScreenWidth);
      setProfileContentWidth(profileContentElement.offsetWidth);
    };
    setTextBoxStyle();

    const handleResize = throttle(setTextBoxStyle, 200);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="flex h-fit snap-center flex-col items-center gap-y-10 pb-56 pt-8" id="about">
      <h2 className="text-3xl">My Timeline</h2>
      <div
        className={twMerge(
          'relative flex w-full flex-col gap-y-48',
          isXxlScreen ? 'items-center' : 'items-start',
        )}
      >
        <MotionWhenInteraction
          startStyle={{ transform: 'scaleY(0)', opacity: '0' }}
          endStyle={{ transform: 'scaleY(1)', opacity: '1' }}
          className={twMerge(
            'absolute inset-y-0 w-1 rounded-full bg-text-secondary',
            isXxlScreen ? 'left-[calc(50%-2px)]' : 'left-[38px]',
            'origin-top transition delay-1000 duration-1000',
          )}
          debug
        />
        {profileContent.services.map((item, index) => {
          const isEven = index % 2 === 0;
          return (
            <Item
              key={item.title}
              item={item}
              isEven={isEven}
              isXxlScreen={isXxlScreen}
              profileContentWidth={profileContentWidth}
            />
          );
        })}
      </div>
    </div>
  );
}

export default About;
