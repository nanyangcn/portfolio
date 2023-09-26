import AnimatedTyping from 'components/AnimatedTyping';
import { profileContent } from 'data/profile';
import { useEffect } from 'react';
import HomeIcon from './HomeIcon';
import Underlying from './Underlying';

function Content({ isUnderlying }: { isUnderlying: boolean }) {
  return (
    <div className="my-20 flex flex-col 2xl:mx-[20%]">
      <div className="h-[84px]">
        <AnimatedTyping
          classNameList={['text-4xl', 'text-4xl', 'text-4xl']}
          textList={['I AM', ' YANG NAN.', ' A FULL-STACK WEB DEVELOPER.']}
          typingSpeed={50}
          deletingSpeed={20}
          showTimeList={[0, 2000, 2000]}
          triggerIndex={0}
          isUnderlying={isUnderlying}
        />
      </div>
      <HomeIcon />
      <p className="text-center text-lg font-semibold leading-loose">
        {profileContent.home}
      </p>
    </div>
  );
}

function Home() {
  useEffect(() => {
    const hoverZoneElement = document.getElementById('hover-zone');
    const homeElement = document.getElementById('home');
    if (!hoverZoneElement || !homeElement) return () => { };

    const handleResize = () => {
      homeElement.style.minHeight = `${hoverZoneElement.offsetHeight}px`;
    };
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      className="relative min-h-[1368px] select-none snap-center"
      id="home"
    >
      <div
        id="hover-zone"
        className="absolute"
      >
        <Content isUnderlying={false} />
      </div>
      <Underlying
        parentId="home"
        hoverElementId="hover-zone"
        className="absolute h-full bg-text-primary text-secondary"
      >
        <Content isUnderlying />
      </Underlying>
    </div>
  );
}

export default Home;
