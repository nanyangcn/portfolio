import { twMerge } from 'tailwind-merge';
import Image from 'next/image';

import { StackItem, stacksList } from 'data/profile';
import MotionWhenInteraction from 'components/MotionWhenInteraction';
import ButtonHoverTitle from 'components/ButtonHoverTitle';

function Item({ stackItem, index }
: { stackItem: StackItem, index: number }) {
  return (
    <MotionWhenInteraction
      startStyle={{ transform: 'scaleX(0)', opacity: '0' }}
      endStyle={{ transform: 'scaleX(1)', opacity: '1' }}
      className="origin-left transition delay-200 duration-700 xl:mx-[5%] 2xl:mx-[10%]"
    >
      <>
        <div className={twMerge(
          `flex w-fit flex-col justify-between divide-text-secondary
            divide-y-2 rounded-r-2xl border-4 border-text-secondary`,
          index === 0 && 'rounded-tl-2xl',
          index === stacksList.length - 1 && 'rounded-bl-2xl',
        )}
        >
          <div className="flex items-center gap-x-1 rounded-tr-2xl border-text-secondary p-1 px-3">
            <stackItem.icon size={32} className="shrink-0" />
            <p className="text-xl">{stackItem.category}</p>
          </div>
          <div className="flex flex-wrap items-center gap-4 p-2">
            {stackItem.stacks.map((stack) => (
              <div
                key={stack.title}
                className={twMerge(
                  'relative flex h-16 w-16 items-center rounded-md hover:bg-text-secondary',
                  stack.needBg && 'bg-text-primary',
                )}
              >
                <Image className="peer p-1" src={stack.image} alt={stack.title} fill />
                <ButtonHoverTitle
                  className="peer-hover:visible peer-hover:opacity-100"
                  position="bottom"
                  title={stack.title}
                />
              </div>
            ))}
          </div>
        </div>
        {index !== stacksList.length - 1 && <div className="h-8 border-l-4 border-text-secondary" />}
      </>
    </MotionWhenInteraction>
  );
}

function Services() {
  return (
    <div
      className="flex h-fit snap-center flex-col py-8"
      id="services"
    >
      <h2 className="ml-8 pb-4 text-3xl xl:mx-[5%] 2xl:mx-[10%]">
        Tech-Stacks I use:
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
