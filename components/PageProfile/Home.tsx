import AnimatedTyping from 'components/AnimatedTyping';
import HomeIcon from './HomeIcon';

function Home() {
  return (
    <div className="flex min-h-[calc(100vh-294px)] snap-center flex-col justify-evenly" id="home">
      <AnimatedTyping
        classNameList={['text-3xl', 'text-3xl', 'text-3xl']}
        textList={['I AM', ' YANG NAN', ' A FULL-STACK WEB DEVELOPER']}
        typingSpeed={50}
        deletingSpeed={20}
        showTimeList={[0, 2000, 2000]}
        triggerIndex={0}
      />
      <HomeIcon />
    </div>
  );
}

export default Home;
