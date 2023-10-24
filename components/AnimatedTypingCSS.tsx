import { useEffect } from 'react';
import { twMerge } from 'tailwind-merge';

import useProfileScroll from 'hooks/useProfileScroll';
import { sectionIdList } from './sidebar/profile/SideBarProfile';

interface AnimatedTypingProps {
  textList: string[];
  triggerIndex?: number;
  speed?: number;
  showTime?: number;
  className?: string;
}

interface TypeStyle extends React.CSSProperties {
  '--type-duration': string;
  '--type-in-delay': string;
  '--type-steps': number;
  '--type-out-delay': string;
}

function AnimatedTyping({
  textList, triggerIndex, showTime, speed = 200, className = '',
}: AnimatedTypingProps) {
  const { activeSectionIndex } = useProfileScroll(sectionIdList, 'profile-content');

  useEffect(() => {
    if (triggerIndex && activeSectionIndex !== triggerIndex) return () => { };
    const elementList = textList.map((text) => document.getElementById(`${text}-cursor`));
    const eventListener = (event: AnimationEvent, element: HTMLElement, elementNext: HTMLElement) => {
      if (event.animationName === 'type-in') {
        const { classList } = element;
        classList.remove('animate-type-in');
        setTimeout(() => {
          classList.add('animate-type-out');
        }, showTime);
      }
      if (event.animationName === 'type-out') {
        const { classList, style } = element;
        style.animationPlayState = 'paused';
        classList.remove('animate-type-out');
        classList.add('animate-type-in');
        const { style: styleNext } = elementNext;
        styleNext.animationPlayState = 'running';
      }
    };
    elementList.forEach((element, iter) => {
      const elementNext = elementList[(iter + 1) % elementList.length];
      if (element && elementNext) {
        element.addEventListener('animationiteration', (event) => eventListener(event, element, elementNext));
      }
    });
    return () => {
      elementList.forEach((element, iter) => {
        const elementNext = elementList[(iter + 1) % elementList.length];
        if (element && elementNext) {
          element.removeEventListener('animationiteration', (event) => eventListener(event, element, elementNext));
        }
      });
    };
  }, [triggerIndex, activeSectionIndex, speed, showTime, textList]);

  if (textList.length === 0) return null;

  return (
    <div className={twMerge('', className)}>
      {textList.map((text, index) => {
        const typeDuration = speed * text.length;
        const typeInDelay = 0;
        const typeOutDelay = 0;
        const typeStyle :TypeStyle = {
          '--type-duration': `${typeDuration}ms`,
          '--type-in-delay': `${typeInDelay}ms`,
          '--type-steps': text.length + 1,
          '--type-out-delay': `${typeOutDelay}ms`,
          animationPlayState: index === 0 ? 'running' : 'paused',
        };

        return (
          <div
            key={text}
            className="absolute flex w-fit flex-wrap items-center font-mono"
          >
            <div
              id={`${text}-cursor`}
              style={typeStyle}
              className="relative animate-type-in overflow-hidden"
            >
              {text}
              <div className="absolute inset-y-0 right-0 animate-cursor-pulse border-l-2" />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default AnimatedTyping;
