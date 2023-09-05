import AnimatedTyping from 'components/AnimatedTyping';
import React from 'react';

function Home() {
  return (
    <div className="flex h-screen flex-col font-mono text-3xl" id="home">
      <AnimatedTyping
        classNameList={['', 'font-bold', 'font-bold']}
        textList={['I AM', ' YANG NAN', ' A FULL-STACK WEB DEVELOPER']}
        typingSpeed={100}
        deletingSpeed={50}
        showTimeList={[100, 2000, 0]}
        triggerIndex={0}
      />
    </div>
  );
}

export default Home;
