import React, { useEffect, useRef } from 'react';
import { twMerge } from 'tailwind-merge';
import Image from 'next/image';

import { StackItem, stacksList } from 'data/profile';

function Item({ stackItem, index }
: { stackItem: StackItem, index: number }) {
  const isAnimated = useRef(false);

  useEffect(() => {
    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const element = entry.target as HTMLElement;
        if (isAnimated.current) return;
        if (entry.isIntersecting) {
          element.style.transform = 'scaleX(1)';
          element.style.opacity = '1';
          isAnimated.current = true;
        } else {
          element.style.transform = 'scaleX(0)';
          element.style.opacity = '0';
        }
      });
    };
    const observer = new IntersectionObserver(handleIntersect, { threshold: 0 });
    const element = document.getElementById(`stack-${stackItem.category}`);
    if (element) observer.observe(element);
  }, [stackItem.category]);

  return (
    <div id={`stack-${stackItem.category}`} className="origin-left transition-all delay-100 duration-700">
      {index !== 0 && (
      <div className="flex h-8 items-end border-l-4 border-text-secondary align-bottom text-xl" />
      )}
      <div className={twMerge(
        `flex w-fit flex-col justify-between divide-text-secondary
        divide-y-2 rounded-r-2xl border-4 border-text-secondary`,
        index === 0 && 'rounded-tl-2xl',
        index === stacksList.length - 1 && 'rounded-bl-2xl',
      )}
      >
        <div className="flex items-center gap-x-1 rounded-tr-2xl border-text-secondary p-2">
          <stackItem.icon size={32} className="shrink-0 rounded-full border-2 p-1" />
          <p className="text-xl">{stackItem.category}</p>
        </div>
        <div className="flex flex-wrap items-center gap-4 p-2">
          {stackItem.stacks.map((stack) => (
            <div
              key={stack.title}
              title={stack.title}
              className={twMerge(
                'relative flex h-16 w-16 items-center',
                stack.needBg && 'bg-text-primary rounded-md',
              )}
            >
              <Image className="p-1" src={stack.image} alt={stack.title} fill />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Services() {
  return (
    <div
      className="flex h-fit snap-center flex-col py-8"
      id="services"
    >
      <h2 className="pb-4 text-3xl">
        The Tech-Stacks I use:
      </h2>
      {stacksList.map((stackItem, index) => (
        <Item
          key={stackItem.category}
          stackItem={stackItem}
          index={index}
        />
      ))}
    </div>
  );
}

export default Services;
