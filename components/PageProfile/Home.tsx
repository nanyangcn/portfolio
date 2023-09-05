import AnimatedTyping from 'components/AnimatedTyping';
import React from 'react';

import { profileContent } from 'data/profile';

function Home() {
  return (
    <div className="flex min-h-[calc(100vh-294px)] flex-col gap-y-6 py-8" id="home">
      <AnimatedTyping
        classNameList={['text-3xl', 'text-3xl', 'text-3xl']}
        textList={['I AM', ' YANG NAN', ' A FULL-STACK WEB DEVELOPER']}
        typingSpeed={100}
        deletingSpeed={50}
        showTimeList={[0, 2000, 0]}
        triggerIndex={0}
      />
      <p className="max-w-4xl animate-[fade-in_2s_ease-out_6s_both]">
        {profileContent.about}
      </p>
    </div>
  );
}

export default Home;
