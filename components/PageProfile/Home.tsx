import AnimatedTyping from 'components/AnimatedTyping';
import React from 'react';

function Home() {
  return (
    <div className="flex h-screen flex-col" id="home">
      <AnimatedTyping
        textList={['Home', 'About']}
        speed={100}
        showTime={2000}
        triggerIndex={0}
      />
    </div>
  );
}

export default Home;
