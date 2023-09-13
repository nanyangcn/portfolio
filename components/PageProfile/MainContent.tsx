import React from 'react';

import ScrollButton from './ScrollButton';

interface MainContentProps {
  children: React.ReactNode
}

function MainContent({ children }: MainContentProps) {
  return (
    <div className="relative grow">
      <div
        id="profile-content"
        className="scroll flex h-full w-full select-text
        flex-col divide-y-2 divide-solid divide-border-primary overflow-hidden overflow-y-scroll
        text-ellipsis px-4 py-8 [&::-webkit-scrollbar-thumb]:bg-[#5252524d] [&::-webkit-scrollbar]:w-3"
      >
        {children}
      </div>
      <ScrollButton />
    </div>
  );
}

export default MainContent;
